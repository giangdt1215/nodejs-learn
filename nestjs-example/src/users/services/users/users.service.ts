import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { User as UserEntity } from 'src/typeorm/User';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { SerializedUser, User } from 'src/users/types';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private users: User[] = [];

  async getUsers() {
    // return this.users.map((user) => plainToClass(SerializedUser, user));
    // return this.users.map((user) => new SerializedUser(user));
    const users = await this.userRepository.find();
    return users.map((user) => new SerializedUser(user));
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(createUserDto: CreateUserDto) {
    const hashPass = encodePassword(createUserDto.password);
    const emailAddress = createUserDto.email;
    const newUser = this.userRepository.create({
      ...createUserDto,
      emailAddress,
      password: hashPass,
    });
    return this.userRepository.save(newUser);
  }

  findUserByUsername(username: string) {
    return this.userRepository.findOne({ where: { username: username } });
  }

  findUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
}

import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { SerializedUser, User } from 'src/users/types';

@Injectable()
export class UsersService {

  private users: User[] = [
    {
      username: 'anson',
      password: 'anson',
    },
    {
      username: 'giang',
      password: 'giang',
    },
    {
      username: 'derek',
      password: 'derek',
    },
    {
      username: 'samantha',
      password: 'samantha',
    },
  ];

  getUsers() {
    // return this.users.map((user) => plainToClass(SerializedUser, user));
    return this.users.map((user) => new SerializedUser(user));
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }
}

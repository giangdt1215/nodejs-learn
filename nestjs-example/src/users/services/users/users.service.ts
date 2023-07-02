import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { SerializedUser, User } from 'src/users/types';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      username: 'anson',
      password: 'anson',
    },
    {
      id: 2,
      username: 'giang',
      password: 'giang',
    },
    {
      id: 3,
      username: 'derek',
      password: 'derek',
    },
    {
      id: 4,
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

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }
}

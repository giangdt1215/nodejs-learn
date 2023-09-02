import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';

@Injectable()
export class AuthService {
  constructor(@Inject('USER_SERVICE') private userService: UsersService) {}

  async validateUser(username: string, password: string) {
    const userDB = await this.userService.findUserByUsername(username);
    if (userDB && userDB.password === password) {
      console.log('Validate user successfully!');
      return userDB;
    }
    console.log('validate user failed!');
    return null;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { comparePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(@Inject('USER_SERVICE') private userService: UsersService) {}

  async validateUser(username: string, password: string) {
    const userDB = await this.userService.findUserByUsername(username);
    if (userDB) {
      console.log(password, ' ', userDB.password);
      if (comparePassword(password, userDB.password)) {
        console.log('Validate user successfully!');
        return userDB;
      } else {
        console.log('Password does not match!');
        return null;
      }
    }
    console.log('validate user failed!');
    return null;
  }
}

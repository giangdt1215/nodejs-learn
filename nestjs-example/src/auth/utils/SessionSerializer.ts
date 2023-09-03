import { PassportSerializer } from "@nestjs/passport";
import { Inject } from "@nestjs/common";
import { UsersService } from "src/users/services/users/users.service";
import { User } from "src/typeorm/User";

export class SessionSerializer extends PassportSerializer {

  constructor(
    @Inject('USER_SERVICE')
    private readonly userService: UsersService,
  ) {
    super();
  }

  serializeUser(user: User, done: (err, user: User) => void) {
    console.log("serialize user");
    done(null, user);
  }

  // the payload type is matching to type of second param of done function in serializeUser()
  async deserializeUser(payload: User, done: Function) {
    console.log("deserialize user");
    const userDB = await this.userService.findUserById(payload.id);
    return userDB ? done(null, userDB) : done(null, null);
  }

}
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super({
      // change the default field username/password with new field, ex: email
      // usernameField: 'email',
      // passwordField: 'keypass'
    });
  }

  // method contains logic to validate credentials
  // passport require request's body contains username and password by default
  // can change with super({usernameField: , passwordField: })
  // if missing one of username/password, the strategy doesn't run validate method
  async validate(username: string, password: string) {
    console.log('validateUser');
    const user = await this.authService.validateUser(username, password);
    // the validate method expect valid authenticate with return user object, if not return null
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

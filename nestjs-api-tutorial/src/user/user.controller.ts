import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  // @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(
    @GetUser() user: User,
    /**@GetUser('email') email: string*/
  ) {
    // console.log({
    //   email,
    // });
    // return req.user;
    return user;
  }
}

import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService, 
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signin(dto: AuthDto) {
    // find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if user does not exist throw exception
    if (!user) throw new ForbiddenException('Credentials incorrect');

    // compare password
    const pwMatches = await argon.verify(user.hash, dto.password);
    // if password inccorect throw exception
    if (!pwMatches) throw new ForbiddenException('Crednetials incorect');
    // delete user.hash;
    const token = await this.signToken(user.id, user.email);
    return {
      access_token: token,
    }
  }

  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    // save the new user to db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hash,
        },
        select: {
          email: true,
          id: true,
          createdAt: true,
        },
      });
      // return the saved user
      const token = await this.signToken(user.id, user.email);
      return {
        access_token: token,
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new ForbiddenException('credentials taken');
      }
      throw new ForbiddenException('credentials taken');
    }
  }

  signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email
    }

    return this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET')
    })
  }
}

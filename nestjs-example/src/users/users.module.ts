import { Module } from '@nestjs/common';
import { UsersController } from './controller/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import { Category } from 'src/typeorm/Category';

@Module({
  imports: [TypeOrmModule.forFeature([User, Category])],
  controllers: [UsersController],
  providers: [
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
  ],
})
export class UsersModule {}

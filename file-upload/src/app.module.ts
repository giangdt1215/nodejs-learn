import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'blog',
    entities: [Image],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([Image]),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

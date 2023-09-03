import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { DataSource } from 'typeorm';
import { SessionEntity } from './typeorm/Session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sessionRepo = app.get(DataSource).getRepository(SessionEntity);
  // set prefix for all api
  // app.setGlobalPrefix('api');
  app.use(
    session({
      name: 'NESTJS_SESSION_ID',
      secret: 'gaingdakjfle', // used to sign the session ID cookie
      resave: false,

      // don't save session when session is not modified. if session is modified, it's initialized
      // if saveUninitialized: true, any new request that don't modify session object come to server that create session object
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      },
      store: new TypeormStore({
        cleanupLimit: 2, // limit number of session entity in db
        limitSubquery: false, // for mysql, mariadb
      }).connect(sessionRepo),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(5001);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // set prefix for all api
  // app.setGlobalPrefix('api');
  app.use(session({
    name: "NESTJS_SESSION_ID",
    secret: 'gaingdakjfle', // used to sign the session ID cookie
    resave: false,

    // don't save session when session is not modified. if session is modified, it's initialized
    // if saveUninitialized: true, any new request that don't modify session object come to server that create session object
    saveUninitialized: false, 
    cookie: {
      maxAge: 60000,
    }
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(5001);
}
bootstrap();

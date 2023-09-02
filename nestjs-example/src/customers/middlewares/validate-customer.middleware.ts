import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidateCustomerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("hello, i'm inside validateCustomerMiddleware");
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(403)
        .send({ error: 'No Authentication token provided' });
    }

    if (authorization === '123') return next();
    else return res.status(403).send({ error: 'Invalid Authentication Token' });
  }
}

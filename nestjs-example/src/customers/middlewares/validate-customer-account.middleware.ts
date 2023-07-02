import { NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

export class ValidateCustomerAccountMiddleware implements NestMiddleware {
  
  use(req: Request, res: Response, next: NextFunction) {
    const { valid } = req.headers;
    console.log('ValidateCustomerAccount')
    if(valid) next();
    else
     res.status(401).send({ error: 'Invalid account'})
  }
}
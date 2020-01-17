import express, { RequestHandler, Response, Request, NextFunction } from 'express'
import { check, validationResult } from 'express-validator'


export function signUpMiddleware(req: Request, res: Response, next: NextFunction){

    

    next();
  
}


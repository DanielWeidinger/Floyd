import App from './app'
import { ApiController } from './controller/ApiController'
import * as bodyParser from 'body-parser'
import { NextFunction } from 'express'
import { Middleware } from './middleware/Middleware'
import { signUpMiddleware } from './middleware/AuthMiddleware'

const app = new App(5000,
//Middleware  
[
  new Middleware('/', bodyParser.json()),
  new Middleware('/', bodyParser.urlencoded({ extended: true })) ,
  new Middleware('/auth/register', signUpMiddleware)
],
//Controller 
[ new ApiController('/api'),
  new ApiController('/auth') ])
 
app.listen()
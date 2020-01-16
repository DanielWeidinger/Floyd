import App from './app'
import { ApiController } from './controller/ApiController'
import * as bodyParser from 'body-parser'
import { NextFunction } from 'express'

const app = new App(5000,
//Middleware  
[
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  (req: Request, res: any, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
  }
],
//Controller 
[ new ApiController("/api") ])
 
app.listen()
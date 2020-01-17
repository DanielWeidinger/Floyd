import App from './app'
import { ApiController } from './controller/ApiController'
import * as bodyParser from 'body-parser'
import { Middleware } from './middleware/Middleware'
import { signUpMiddleware } from './middleware/AuthMiddleware'
import { getMongoInstace } from './config/config'
import { AuthController } from './controller/AuthController'




const app = new App(5000,
//Middleware  
[
  new Middleware('/', bodyParser.json()),
  new Middleware('/', bodyParser.urlencoded({ extended: true })),
  //new Middleware('/auth/register', signUpMiddleware)
],
//Controller 
[ //new ApiController('/api'),
  new AuthController('/auth', getMongoInstace("mongodb+srv://daniel:daniel123@cluster0-wi7r8.mongodb.net/test?retryWrites=true&w=majority")) ])
 
app.listen()
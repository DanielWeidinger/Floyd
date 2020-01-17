import App from './app'
import { ApiController } from './controller/ApiController'
import * as bodyParser from 'body-parser'
import { Middleware } from './middleware/Middleware'
import { signUpMiddleware } from './middleware/AuthMiddleware'
import { Config } from './config/Config'
import { AuthController } from './controller/AuthController'
import { getMongoInstance } from './config/DB'


const config = new Config();
getMongoInstance(config.connectionString).then(mongoose => {

  const app = new App(5000,
    //Middleware  
    [
      new Middleware('/', bodyParser.json()),
      new Middleware('/', bodyParser.urlencoded({ extended: true })),
      //new Middleware('/auth/register', signUpMiddleware)
    ],
    //Controller 
    [ new ApiController('/api'),
      new AuthController('/auth', mongoose) ]
  )
     
  app.listen()
})
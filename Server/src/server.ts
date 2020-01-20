import App from './app'
import { FloydController } from './controller/FloydController'
import * as bodyParser from 'body-parser'
import { Middleware } from './middleware/Middleware'
import { Config } from './config/Config'
import { AuthController } from './controller/AuthController'
import { getMongoInstance } from './config/DB'
import { verifyToken, allowCrossOrigin } from './middleware/implementations/AuthMiddleware'
import { socketVerifyToken } from './middleware/implementations/SocketAuthMiddleware'
import { MessagingSockets } from './sockets/MessagingSockets'
import cors from 'cors'


getMongoInstance(Config.connectionString).then(mongoose => {

  const app = new App(5000,
    //Middleware  
    [
      new Middleware('/', bodyParser.json()),
      new Middleware('/', bodyParser.urlencoded({ extended: true })),
      new Middleware('/', cors()),
      new Middleware('/messaging', verifyToken),
    ],
    //Controller 
    [ new FloydController('/messaging'),
      new AuthController('/auth') ],
    //SocketMiddleware
    [
      socketVerifyToken,
    ],
    //Sockets
    [
      new MessagingSockets()
    ]
  )

    //https.createServer(app);

  app.listen()
})
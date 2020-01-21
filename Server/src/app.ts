import express, { RequestHandler } from 'express'
import { Application } from 'express'
import IControllable from './contracts/IControllable';
import { Middleware } from './middleware/Middleware';
import http from 'http';
import socket from 'socket.io';
import { SocketMiddleware } from './contracts/SocketMiddleware';
import { ISocketabel } from './contracts/ISocketable';

class App{
    public app: Application;
    public http: http.Server;
    public io: socket.Server;
    public port: number;

    constructor(port: number, middleWare: Middleware[], controllers: IControllable[], socketMiddleware: SocketMiddleware[], sockets: ISocketabel[]){
        this.app = express();
        this.http = http.createServer(this.app);
        this.io = socket();
        this.port = port;

        this.middlewares(middleWare)
        this.routes(controllers)
        this.socketMiddleware(socketMiddleware)
        this.sockets(sockets);
    }

    private middlewares(middleWares: Middleware[]) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare.route, middleWare.handler)
        })
    }

    private routes(controllers: IControllable[]) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        })
    }

    private socketMiddleware(middleWare: SocketMiddleware[]){
        middleWare.forEach(middleWare => {
            this.io.use(middleWare)
        })
    }

    private sockets(sockets: ISocketabel[]) {
        sockets.forEach(socketable =>{
            socketable.initSockets(this.io)
        })
    }

    public listen() {
        this.http.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`)
        })
        this.io.listen(this.http)
    }
}

export default App
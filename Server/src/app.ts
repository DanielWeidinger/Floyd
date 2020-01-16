import express, { RequestHandler } from 'express'
import { Application } from 'express'
import IControllable from './controller/IControllable';
import { Middleware } from './middleware/Middleware';

class App{
    public app: Application
    public port: number

    constructor(port: number, middleWare: Middleware[], controllers: IControllable[]){
        this.app = express();
        this.port = port;

        this.middlewares(middleWare)
        this.routes(controllers)
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

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`)
        })
    }
}

export default App
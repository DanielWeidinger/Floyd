import { Request, Response, Router } from 'express'
import IControllable from './IControllable'
const Pusher = require('pusher');

export class AuthController implements IControllable{
    public router: Router = Router();
    private path: string;
    private pusher: any;

    constructor(path: string){
        this.path = path;

        this.initRoutes()
    }

    initRoutes(): void {

        this.router.post('/sign-up', (req, res, next) => {});
        this.router.post('/login', (req, res, next) => {});
        this.router.get('/secret-route', (req, res, next) => {
          res.send('This is the secret content. Only logged in users can see that!');
        });
    }
}

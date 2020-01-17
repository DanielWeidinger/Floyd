import { Request, Response, Router } from 'express'
import IControllable from './IControllable'

export class ApiController implements IControllable{
    public router: Router = Router();
    private path: string;

    constructor(path: string){
        this.path = path

        this.initRoutes()
    }

    initRoutes(): void {

        this.router.get(this.path, (req, res) => {
            res.send("Running")
        })
    }
}

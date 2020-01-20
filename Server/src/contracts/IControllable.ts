import { Router, RequestHandler, Request } from 'express'
import { Middleware } from '../middleware/Middleware';

export default interface IControllable{
    router: Router;
    initRoutes(): void;
}
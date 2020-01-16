import { Router } from 'express'

export default interface IControllable{
    router: Router;
    initRoutes(): void;
}
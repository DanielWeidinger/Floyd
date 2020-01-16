import { RequestHandler } from 'express'

export default interface IUseable{
    middleWare: RequestHandler;
}
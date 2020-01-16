import { Request, Response, Router } from 'express'
import IControllable from './IControllable'
const Pusher = require('pusher');

export class ApiController implements IControllable{
    public router: Router = Router();
    private path: string;
    private pusher: any;

    constructor(path: string){
        this.path = path

        this.pusher = new Pusher({
            appId: '926344',
            key: '93da0690b2a2d810e34f',
            secret: 'c2efbd368c4389734391',
            cluster: 'eu'
        });

        this.initRoutes()
    }

    initRoutes(): void {

        this.router.get(this.path, (req, res) => {
            res.send("Running")
        })

        this.router.post(this.path + '/auth', (req, res) => {
            console.log('POST to /pusher/auth');
            const socketId = req.body.socket_id;
            const channel = req.body.channel_name;

            const auth = this.pusher.authenticate(socketId, channel)
            res.send(auth)
        })

        this.router.get(this.path + '/test', (req, res) => {
            console.log('Tesing');
            this.pusher.trigger('private-messages', 'client-new-message', 'lol')

            res.send('sent')
        })
    }
}

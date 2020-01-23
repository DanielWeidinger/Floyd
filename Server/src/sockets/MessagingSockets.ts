import { ISocketabel } from "../contracts/ISocketable";
import { Server, Socket } from "socket.io";
import Message, { IMessage } from '../models/Message';
import User, { IUser } from "../models/User";

export class MessagingSockets implements ISocketabel{

    initSockets(io: Server): void {
        io.sockets.on('connection', (socket: any) => {

            //const user = User.findById(socket.decoded.user.id)

            const unreadMessages = Message.find({ read: true, recipient: socket.user })

            //console.log(unreadMessages)

            socket.on('message', (message: IMessage) => {
                console.log(message)
            })
        })
    }


}
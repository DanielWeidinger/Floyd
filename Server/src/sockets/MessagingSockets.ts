import { ISocketabel } from "../contracts/ISocketable";
import { Server, Socket } from "socket.io";
import Message, { IMessage } from '../models/Message';
import User, { IUser } from "../models/User";

export class MessagingSockets implements ISocketabel{

    initSockets(io: Server): void {
        io.on('connection', (socket: any) => {

            //const user = User.findById(socket.decoded.user.id)

            const unreadMessages = Message.find({ read: true, recipient: socket.decoded })

            socket.on('message', (message: IMessage) => {

            })
        })
    }


}
import { ISocketabel } from "../contracts/ISocketable";
import { Server, Socket } from "socket.io";
import Message, { IMessage } from '../models/Message';
import User, { IUser } from "../models/User";

export class MessagingSockets implements ISocketabel{

    connectedUserMap: Map<string, string> = new Map();

    initSockets(io: Server): void {
        io.on('connection', (socket: any) => {
            User.findById(socket.decoded.user.id).exec((err, dbUser) => {
                if(err){
                    throw err;
                }

                if(!dbUser){
                    throw new Error("Socket: User not found")
                }
                
                const user: IUser = dbUser;

                this.connectedUserMap.set(user.username, socket.id);

                Message.find({ read: true, recipient: user._id }).exec((err, messages) => { //TODO neues Message Model für Client!!!
                    if(err){

                        return socket.emit("error", err.message) //TODO error event client
                    }          

                    messages.forEach(message => {
                        socket.emit("message", message);
                    })
                });

                socket.on('message', (message: IMessage) => {
                    User.findOne({username: message.recipient}).exec((err, dbRecipient) => {
                        if(err){
                            throw err;
                        }

                        if(!dbRecipient){
                            return socket.emit("error", "Recipient not found!")
                        }

                        message.recipient = dbRecipient._id;

                        message.save((err, dbMessage) => {
                            if(err){
                                throw err;
                            }
                            
                            //Send if user is online
                            const recipient = this.connectedUserMap.get(message.recipient)
                            if(!recipient){
                                throw new Error("Socket: Recipient not found");
                            }
                            io.to(recipient).emit("message", message)
                        });
                    });
                });
            });

            
        })
    }


}
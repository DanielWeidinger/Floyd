import { ISocketabel } from "../contracts/ISocketable";
import { Server, Socket } from "socket.io";
import Message, { IMessage, MessageDto } from '../models/Message';
import User, { IUser } from "../models/User";

export class MessagingSockets implements ISocketabel{

    connectedUserMap: Map<string, string> = new Map();

    initSockets(io: Server): void {
        io.on('connection', (socket: any) => {
            User.findById(socket.decoded.user.id).exec((err, dbUser: IUser) => {
                if(err){
                    throw err;
                }

                if(!dbUser){
                    throw new Error("Socket: User not found")
                }

                this.connectedUserMap.set(dbUser.username, socket.id);

                Message.find({ read: false, recipient: dbUser.username }).exec((err, messages) => {
                    if(err){

                        return socket.emit("error", err.message) //TODO error event client
                    }

                    messages.forEach(message => {
                        this.sendMessage("inbox", io, socket.id, message.recipient, dbUser.username, message);
                    })
                });

                socket.on('message', (message: MessageDto) => {
                    User.findOne({username: message.recipient}).exec((err, dbRecipient) => {
                        if(err){
                            throw err;
                        }

                        if(!dbRecipient){
                            return socket.emit("error", "Recipient not found!")
                        }

                        const newDbMessage = new Message(message);
                        newDbMessage.username = dbUser.username;

                        newDbMessage.save((err, dbMessage) => {
                            if(err){
                                throw err;
                            }
                            
                            //Send if user is online
                            const socketId = this.connectedUserMap.get(message.recipient)
                            if(socketId){
                                this.sendMessage("message", io, socketId, message.username, message.recipient, dbMessage);
                            }
                        });
                    });
                });
            }); 
        });
    }

    sendMessage(event: string, io: Server, socketId: string, username: string, recipientName: string, message: IMessage){
        message.updateOne({read: true}, (err, updated) => {
            if(err){
                throw err;
            }

            const messageDto: MessageDto = {
                username: username,
                recipient: recipientName,
                text: message.text,
                timestamp: message.timestamp,
                read: message.read,
            }
            console.log(messageDto)
            io.to(socketId).emit(event, messageDto)
        })
    }
}
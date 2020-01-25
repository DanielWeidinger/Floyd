import mongoose, { Schema, Document } from "mongoose"
import { IUser } from './User'

export interface IMessage extends Document {
    user: IUser['_id'],
    recipient: IUser['_id'],
    text: string,
    timestamp: Date,
    read: boolean
}

export interface MessageDto{
    username: IUser['username'],
    recipient: IUser['username'],
    text: IMessage['text'],
    timestamp: IMessage['timestamp'],
    read: IMessage['read']
}

const MessageSchema: Schema = new Schema({
    user: {
        type: String,
        required: true
    },
    recipient: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model<IMessage>('Message', MessageSchema);
import mongoose, { Schema, Document } from "mongoose"
import { IUser } from './User'

export interface IMessage extends Document {
    user: IUser['_id'],
    recipient: IUser['_id'],
    text: string,
    timestamp: Date,
    read: boolean
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
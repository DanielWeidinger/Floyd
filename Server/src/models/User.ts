import mongoose, { Schema, Document } from "mongoose"
import { IGroup } from './Group'

export interface IUser extends Document {
    username: string;
    passwordHash: string;
    salt: string;
    groups: IGroup['_id'][]
    contacts: IUser['_id'][]
}

export interface UserDto {
    username: IUser['username']
}

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    groups: {
        type: [String]
    },
    contacts: {
        type: [String]
    }
})

export default mongoose.model<IUser>('User', UserSchema);
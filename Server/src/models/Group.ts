import mongoose, { Schema, Document } from "mongoose"
import { IUser } from "./User";

export interface IGroup extends Document {
    name: IUser['username'];
    users: IUser['username'][];
}

export interface GroupDto{
    name: IGroup['name'],
    users: IGroup['users']
}

const GroupSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    users: {
        type: String,
        required: true
    }
});

export default mongoose.model<IGroup>('Group', GroupSchema);
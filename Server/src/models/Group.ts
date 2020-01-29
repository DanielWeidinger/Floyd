import mongoose, { Schema, Document } from "mongoose"
import { IUser } from "./User";

export interface IGroup extends Document {
<<<<<<< HEAD
    name: string;
    users: IUser['username'][];
=======
    name: IUser['username'];
    users: IUser['username'][];
}

export interface GroupDto{
    id: IGroup['_id'],
    name: IGroup['name'],
    users: IGroup['users']
>>>>>>> ada4a113bea8de4b1ad43160921ed8725048c385
}

const GroupSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    users: {
        type: [String],
        required: true
    }
});

export default mongoose.model<IGroup>('Group', GroupSchema);
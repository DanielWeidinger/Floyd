import mongoose, { Schema, Document } from "mongoose"

interface IUser extends Document {
    username: string;
    passwordHash: string;
    salt: string;
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
    }
})

export default mongoose.model<IUser>('User', UserSchema);
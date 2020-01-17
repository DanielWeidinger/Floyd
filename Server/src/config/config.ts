import { Mongoose } from 'mongoose'

export function getMongoInstace(connectionString: string): Mongoose{

    const mongoose = new Mongoose()

    try {
        mongoose.connect(connectionString, {
            useNewUrlParser: true
        });
        console.log("Connected to DB !!");
    } catch (e) {
        console.log(e);
        throw e;
    }

    return mongoose;
}
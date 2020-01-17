import { Mongoose } from 'mongoose'

export async function getMongoInstance(connectionString: string): Promise<Mongoose>{

    const mongoose = new Mongoose({useUnifiedTopology: true})

    try {
        await mongoose.connect(connectionString, {
          useNewUrlParser: true
        });
        console.log("Connected to DB !!");
      } catch (e) {
        console.log(e);
        throw e;
      }

    return mongoose;
}
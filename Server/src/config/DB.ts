import mongoose from 'mongoose'

export async function connectMongoInstance(connectionString: string): Promise<mongoose.Mongoose>{

    //const mongoose = new Mongoose({useUnifiedTopology: true})

    try {
        await mongoose.connect(connectionString, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        
        console.log("Connected to DB !!");
      } catch (e) {
        console.log(e);
        throw e;
      }

    return mongoose;
}
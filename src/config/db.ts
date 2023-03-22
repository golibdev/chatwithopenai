import mongoose, { Connection } from "mongoose";
import { config } from './config';

export const connectDB = async () => {
   try {
      const connect = await mongoose.connect(config.MONGO_URI);
      console.log(`Connected MongoDB on: ${connect.connection.host}`);
   } catch (err: any) {
      throw new Error(err);
   }
}
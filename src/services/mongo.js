import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const connect = mongoose.connect(String(process.env.MONGODB_URI));
    return connect;
  } catch (err) {
    throw err;
  }
};

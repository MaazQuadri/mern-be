import mongoose from "mongoose";
import colors from "colors";

export const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    console.log("Mongo DB Connection Successful".bgMagenta);
  } catch (error) {
    console.log("Mongo DB Connection Failed".bgRed);
  }
};

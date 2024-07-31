import mongoose from "mongoose";

const connectDB = (url: string): Promise<typeof mongoose> => {
  return mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to Database...");
      return mongoose;
    })
    .catch((err: Error) => {
      console.log(err);
      process.exit(1);
    });
};

export default connectDB;

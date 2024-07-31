import express, { type Express, type Request, type Response } from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";

import connectDB from "./db/connect";

const app: Express = express();
dotenv.config();
const PORT = process.env.PORT || 5001;

app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send('<h2 style="text-align: center;">Task management API</h2>');
});

const start = async (): Promise<void> => {
  try {
    connectDB(process.env.MONGO_URI!);
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

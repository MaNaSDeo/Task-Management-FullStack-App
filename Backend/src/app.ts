import express, { type Express, type Request, type Response } from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import authRouter from "./routes/v1/auth.route";
import taskRoutes from "./routes/v1/task.route";

import connectDB from "./db/connect";

const app: Express = express();
dotenv.config();
const PORT = process.env.PORT || 5001;

app.use(morgan("tiny"));
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send('<h2 style="text-align: center;">Task management API</h2>');
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/task", taskRoutes);

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

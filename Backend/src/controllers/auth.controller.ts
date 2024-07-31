import { type Request, type Response } from "express";

const register = async (req: Request, res: Response) => {
  res.send("Register");
};
const login = async (req: Request, res: Response) => {
  res.send("Login");
};

export { register, login };

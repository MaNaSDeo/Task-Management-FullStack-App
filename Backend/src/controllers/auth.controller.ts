import { type Request, type Response } from "express";
import UserModel from "../models/User.model";
import jwt from "jsonwebtoken";

interface RegisterRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  };
}

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}
const register = async (req: RegisterRequest, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      res.status(400).json({ error: "Name, Email and Password are required" });
      return;
    }

    let user = await UserModel.findOne({ email });
    if (user) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    user = new UserModel({ name, email, password });
    await user.save();

    const payload = { id: user.id };
    const userData = { email: user.email, name: user.name };

    jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({
          msg: "User registered Successfully",
          token,
          user: userData,
        });
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const login = async (req: LoginRequest, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({ error: "Email and Password are required" });
      return;
    }
    let user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    let isMatch: boolean;
    try {
      isMatch = await user.comparePassword(password);
    } catch (compareError) {
      res.status(500).json({ error: "Error during password comparison" });
      return;
    }

    if (!isMatch) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    const payload = { id: user.id };
    const userData = { email: user.email, name: user.name };

    jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ msg: "User logged in Successfully", token, user: userData });
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
export { register, login };

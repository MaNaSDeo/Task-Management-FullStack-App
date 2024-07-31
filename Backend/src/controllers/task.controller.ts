import { type Request, type Response } from "express";

const createTask = async (req: Request, res: Response) => {
  res.send("createTask");
};
const getTasks = async (req: Request, res: Response) => {
  res.send("getTasks");
};
const updateTask = async (req: Request, res: Response) => {
  res.send("updateTask");
};
const deleteTask = async (req: Request, res: Response) => {
  res.send("deleteTask");
};

export { createTask, getTasks, updateTask, deleteTask };

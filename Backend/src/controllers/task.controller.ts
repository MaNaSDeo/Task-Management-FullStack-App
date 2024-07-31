import { Request, Response } from "express";
import Task, { ITask } from "../models/Task.model";
import { isValidObjectId } from "mongoose";

interface AuthRequest extends Request {
  user?: { id: string };
}

const createTask = async (req: AuthRequest, res: Response) => {
  const { title, description, status, priority, deadline } = req.body;

  if (!title || !status) {
    return res.status(400).json({ error: "Title and Status are required" });
  }

  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const newTask: ITask = new Task({
      user: req.user.id,
      title,
      description,
      status,
      priority,
      deadline: deadline ? new Date(deadline) : undefined,
    });

    const task = await newTask.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const tasks = await Task.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json({ message: "Tasks retrieved successfully", tasks });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

const updateTask = async (req: AuthRequest, res: Response) => {
  const { title, description, status, priority, deadline } = req.body;

  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    let task = (await Task.findById(req.params.id)) as ITask | null;

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "User not authorized" });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title,
          description,
          status,
          priority,
          deadline: deadline ? new Date(deadline) : undefined,
        },
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    const task = (await Task.findById(req.params.id)) as ITask | null;

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "User not authorized" });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Task removed successfully" });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

export { createTask, getTasks, updateTask, deleteTask };

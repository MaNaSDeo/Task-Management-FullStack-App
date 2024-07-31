import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../../controllers/task.controller";
import express from "express";

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;

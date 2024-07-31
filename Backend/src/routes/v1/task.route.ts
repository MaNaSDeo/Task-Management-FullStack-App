import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../../controllers/task.controller";
import express from "express";
import authMiddleware from "../../middleware/auth.middleWare";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;

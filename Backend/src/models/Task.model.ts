import mongoose, { Schema, Document, Model } from "mongoose";
import { isValidObjectId } from "mongoose";
import { IUser } from "./User.model";

export interface ITask extends Document {
  user: IUser["_id"];
  title: string;
  description?: string;
  status: "To do" | "In progress" | "Under review" | "Finished";
  priority: "Low" | "Medium" | "Urgent";
  deadline?: Date;
  date: Date;
}

const TaskSchema: Schema<ITask> = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
    validate: {
      validator: isValidObjectId,
      message: "Invalid User ID",
    },
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    required: [true, "Status is required"],
    enum: {
      values: ["To do", "In progress", "Under review", "Finished"],
      message:
        "Status must be one of the following: To do, In progress, Under review, Finished",
    },
  },
  priority: {
    type: String,
    enum: {
      values: ["Low", "Medium", "Urgent"],
      message: "Priority must be one of the following: Low, Medium, Urgent",
    },
    default: "Low",
  },
  deadline: {
    type: Date,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

interface ITaskModel extends Model<ITask> {}

const TaskModel: ITaskModel = mongoose.model<ITask, ITaskModel>(
  "Task",
  TaskSchema
);

export default TaskModel;

import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  tasks: {
    type: Object,
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;

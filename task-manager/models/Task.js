import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date }, 
    dueDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value ? value >= new Date().setHours(0,0,0,0) : true;
        },
        message: "Due date must be in the future",
      }
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);
export default Task;
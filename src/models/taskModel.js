// taskModel.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    taskName: {
      type: String,
      required: true,
    },
    taskDescription: {
      type: String,
      required: true,
    },
    deadlineDate: {
      type: Date,
      required: true,
    },
    mark: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    state: {
      type: String,
      required: true,
      enum: ["pending", "in progress", "completed"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

// taskController.js
const Task = require("../models/taskModel");
const { sendEventToAll } = require("../sseManager");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addTask = async (req, res) => {
  const {
    courseName,
    taskName,
    taskDescription,
    deadlineDate,
    mark,
    state,
    userId,
  } = req.body;

  try {
    if (req.user.role !== "admin" && req.user.id !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to assign tasks to other users" });
    }

    const newTask = new Task({
      courseName,
      taskName,
      taskDescription,
      deadlineDate,
      mark,
      state,
      userId: req.user.role === "admin" ? userId : req.user.id,
    });
    await newTask.save();
    sendEventToAll({ type: "ADD_TASK", payload: newTask });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const {
    courseName,
    taskName,
    taskDescription,
    deadlineDate,
    mark,
    state,
    userId,
  } = req.body;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (req.user.role !== "admin" && req.user.id !== task.userId.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this task" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        courseName,
        taskName,
        taskDescription,
        deadlineDate,
        mark,
        state,
        userId: req.user.role === "admin" ? userId : task.userId,
      },
      { new: true }
    );

    sendEventToAll({ type: "UPDATE_TASK", payload: updatedTask });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    sendEventToAll({
      type: "DELETE_TASK",
      payload: { id: deletedTask._id },
    });
    res.json({ id: deletedTask._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

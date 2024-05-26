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
  const { courseName, taskName, taskDescription, deadlineDate, mark, state } =
    req.body;
  const userId = req.user.id;

  try {
    const newTask = new Task({
      courseName,
      taskName,
      taskDescription,
      deadlineDate,
      mark,
      state,
      userId,
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
  const { courseName, taskName, taskDescription, deadlineDate, mark, state } =
    req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { courseName, taskName, taskDescription, deadlineDate, mark, state },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
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

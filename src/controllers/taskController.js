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

exports.getPaginatedTasks = async (req, res) => {
  const { page = 1, limit = 3 } = req.query;
  try {
    const tasks = await Task.find({ userId: req.user.id })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Task.countDocuments({ userId: req.user.id });

    res.json({
      tasks,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
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
  const { taskName, taskDescription, deadlineDate, mark, state } = req.body;

  if (!taskName || !taskDescription || !deadlineDate || !mark || !state) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { taskName, taskDescription, deadlineDate, mark, state },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

exports.searchTasks = async (req, res) => {
  const { query } = req.query;
  try {
    const tasks = await Task.find({
      userId: req.user.id,
      $or: [
        { taskName: { $regex: query, $options: "i" } },
        { taskDescription: { $regex: query, $options: "i" } },
      ],
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
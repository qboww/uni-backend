// taskRoutes.js
const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  getAllTasks,
} = require("../controllers/taskController");

const router = express.Router();

router.route("/").get(protect, getTasks).post(protect, addTask);
router.route("/admin").get(protect, admin, getAllTasks);

router.route("/:id").patch(protect, updateTask).delete(protect, deleteTask);

module.exports = router;

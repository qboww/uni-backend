// taskRoutes.js
const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  getAllTasks,
  getPaginatedTasks,
  searchTasks,
} = require("../controllers/taskController");

const router = express.Router();

router.route("/").get(protect, getTasks);
router.route("/paginated").get(protect, getPaginatedTasks);
router.route("/search").get(protect, searchTasks); 
router.route("/").post(protect, addTask);
router.route("/admin").get(protect, admin, getAllTasks);
router.route("/:id").patch(protect, updateTask);
router.route("/:id").delete(protect, deleteTask);

module.exports = router;

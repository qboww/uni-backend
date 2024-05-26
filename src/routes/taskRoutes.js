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

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get tasks for the current user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 *       500:
 *         description: Server error
 */
router.route("/").get(protect, getTasks);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Add a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseName
 *               - taskName
 *               - taskDescription
 *               - deadlineDate
 *               - mark
 *               - state
 *               - userId
 *             properties:
 *               courseName:
 *                 type: string
 *               taskName:
 *                 type: string
 *               taskDescription:
 *                 type: string
 *               deadlineDate:
 *                 type: string
 *                 format: date
 *               mark:
 *                 type: number
 *               state:
 *                 type: string
 *                 enum: ["pending", "in progress", "completed"]
 *               userId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Task added successfully
 *       400:
 *         description: Not authorized to assign tasks to other users
 *       500:
 *         description: Server error
 */
router.route("/").post(protect, addTask);

/**
 * @swagger
 * /tasks/admin:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all tasks
 *       500:
 *         description: Server error
 */
router.route("/admin").get(protect, admin, getAllTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseName:
 *                 type: string
 *               taskName:
 *                 type: string
 *               taskDescription:
 *                 type: string
 *               deadlineDate:
 *                 type: string
 *                 format: date
 *               mark:
 *                 type: number
 *               state:
 *                 type: string
 *                 enum: ["pending", "in progress", "completed"]
 *               userId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       403:
 *         description: Not authorized to update this task
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.route("/:id").patch(protect, updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.route("/:id").delete(protect, deleteTask);

module.exports = router;

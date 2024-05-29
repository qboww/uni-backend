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

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management
 */

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
 * /tasks/paginated:
 *   get:
 *     summary: Get paginated tasks for the current user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 3
 *         description: Number of tasks per page
 *     responses:
 *       200:
 *         description: List of paginated tasks
 *       500:
 *         description: Server error
 */
router.route("/paginated").get(protect, getPaginatedTasks);

/**
 * @swagger
 * /tasks/search:
 *   get:
 *     summary: Search tasks for the current user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of tasks
 *       500:
 *         description: Server error
 */
router.route("/search").get(protect, searchTasks);

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
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task added successfully
 *       400:
 *         description: Bad request
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
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Bad request
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
 *         description: Task ID
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

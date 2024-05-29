// userRoutes.js
const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const { getUsers } = require("../controllers/userController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       500:
 *         description: Server error
 */
router.route("/").get(protect, admin, getUsers);

module.exports = router;

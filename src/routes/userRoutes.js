// userRoutes.js
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const { getUsers } = require("../controllers/userController");

const router = express.Router();

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
 *         description: A list of users.
 *       401:
 *         description: Unauthorized
 */
router.route("/").get(protect, admin, getUsers);

module.exports = router;

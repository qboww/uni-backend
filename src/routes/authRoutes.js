const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} = require("../controllers/authController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *         role:
 *           type: string
 *           description: The user's role
 *           enum: [user, admin]
 *       example:
 *         name: John Doe
 *         email: john.doe@example.com
 *         password: password123
 *         role: user
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The auth managing API
 */

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *       400:
 *         description: The user already exists
 *       500:
 *         description: Some server error
 */

router.post("/signup", registerUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Some server error
 */

router.post("/login", loginUser);

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Logout the user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: The user was successfully logged out
 *       500:
 *         description: Some server error
 */

router.post("/logout", logoutUser);

/**
 * @swagger
 * /users/current:
 *   get:
 *     summary: Get the current user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The current user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Some server error
 */

router.get("/current", protect, getCurrentUser);

/**
 * @swagger
 * /users/admin:
 *   get:
 *     summary: Get admin content
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin content
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Admin content
 *       403:
 *         description: Not authorized as an admin
 *       401:
 *         description: Not authorized, token failed
 *       500:
 *         description: Some server error
 */

router.get("/admin", protect, admin, (req, res) => {
  res.send("Admin content");
});

module.exports = router;

// authRoutes.js
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication management
 */

const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getAllUsers,
} = require("../controllers/authController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     responses:
 *       201:
 *         description: User registered successfully.
 */
router.post("/signup", registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged in successfully.
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged out successfully.
 */
router.post("/logout", logoutUser);

/**
 * @swagger
 * /auth/current:
 *   get:
 *     summary: Get current user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user retrieved successfully.
 *       401:
 *         description: Unauthorized
 */
router.get("/current", protect, getCurrentUser);

/**
 * @swagger
 * /auth/all:
 *   get:
 *     summary: Get all users
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users retrieved successfully.
 *       401:
 *         description: Unauthorized
 */
router.get("/all", protect, admin, getAllUsers);

router.get("/admin", protect, admin, (req, res) => {
  res.send("Admin content");
});

module.exports = router;

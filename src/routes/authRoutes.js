// authRoutes.js
const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getAllUsers, // Import the new controller function
} = require("../controllers/authController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/current", protect, getCurrentUser);
router.get("/all", protect, admin, getAllUsers); // Add a new route to get all users

router.get("/admin", protect, admin, (req, res) => {
  res.send("Admin content");
});

module.exports = router;

//userController.js
const User = require("../models/authModel");
const { sendEventToAll } = require("../sseManager");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("name email");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

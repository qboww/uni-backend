// contactRoutes.js
const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
  getAllContacts,
} = require("../controllers/contactController");

const router = express.Router();

router.route("/").get(protect, getContacts).post(protect, addContact);
router.route("/admin").get(protect, admin, getAllContacts);

router
  .route("/:id")
  .patch(protect, updateContact)
  .delete(protect, deleteContact);

module.exports = router;

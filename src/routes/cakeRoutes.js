// cakeRoutes.js
const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const {
  getCakes,
  addCake,
  updateCake,
  deleteCake,
} = require("../controllers/cakeController");
const { eventsHandler } = require("../sseManager");

const router = express.Router();

router.route("/").get(getCakes).post(protect, admin, addCake);
router
  .route("/:id")
  .patch(protect, admin, updateCake)
  .delete(protect, admin, deleteCake);
router.get("/events", eventsHandler);

module.exports = router;

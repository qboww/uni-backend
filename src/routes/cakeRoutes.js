// cakeRoutes.js
/**
 * @swagger
 * tags:
 *   name: Cakes
 *   description: Cake management
 */

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

/**
 * @swagger
 * /cakes:
 *   get:
 *     summary: Get all cakes
 *     tags: [Cakes]
 *     responses:
 *       200:
 *         description: A list of cakes.
 */
router.route("/").get(getCakes);

/**
 * @swagger
 * /cakes:
 *   post:
 *     summary: Add a new cake
 *     tags: [Cakes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Cake created successfully.
 *       401:
 *         description: Unauthorized
 */
router.route("/").post(protect, admin, addCake);

/**
 * @swagger
 * /cakes/{id}:
 *   patch:
 *     summary: Update a cake
 *     tags: [Cakes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the cake to update
 *     responses:
 *       200:
 *         description: Cake updated successfully.
 *       401:
 *         description: Unauthorized
 */
router.route("/:id").patch(protect, admin, updateCake);

/**
 * @swagger
 * /cakes/{id}:
 *   delete:
 *     summary: Delete a cake
 *     tags: [Cakes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the cake to delete
 *     responses:
 *       200:
 *         description: Cake deleted successfully.
 *       401:
 *         description: Unauthorized
 */
router.route("/:id").delete(protect, admin, deleteCake);

/**
 * @swagger
 * /cakes/events:
 *   get:
 *     summary: Get cake events
 *     tags: [Cakes]
 *     responses:
 *       200:
 *         description: Cake events.
 */
router.get("/events", eventsHandler);

module.exports = router;

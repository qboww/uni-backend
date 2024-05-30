// ingredientRoutes.js
/**
 * @swagger
 * tags:
 *   name: Ingredients
 *   description: Ingredient management
 */

const express = require("express");
const { getIngredients } = require("../controllers/ingredientController");

const router = express.Router();

/**
 * @swagger
 * /ingredients:
 *   get:
 *     summary: Get all ingredients
 *     tags: [Ingredients]
 *     responses:
 *       200:
 *         description: A list of ingredients.
 */
router.get("/", getIngredients);

module.exports = router;

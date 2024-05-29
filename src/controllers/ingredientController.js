const Cake = require("../models/cakeModel");

exports.getIngredients = async (req, res) => {
  try {
    const ingredients = await Cake.distinct("components");
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

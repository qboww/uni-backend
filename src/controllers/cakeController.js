// cakeController.js
const Cake = require("../models/cakeModel");

exports.addCake = async (req, res) => {
  const { name, category, weight, price } = req.body;
  try {
    const newCake = new Cake({ name, category, weight, price });
    await newCake.save();
    res.status(201).json(newCake);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCake = async (req, res) => {
  const { id } = req.params;
  const { name, category, weight, price } = req.body;

  try {
    const updatedCake = await Cake.findByIdAndUpdate(
      id,
      { name, category, weight, price },
      { new: true }
    );

    if (!updatedCake) {
      return res.status(404).json({ message: "Cake not found" });
    }

    res.json(updatedCake);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCake = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCake = await Cake.findByIdAndDelete(id);
    if (!deletedCake) {
      return res.status(404).json({ message: "Cake not found" });
    }
    res.json({ id: deletedCake._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCakes = async (req, res) => {
  const {
    page = 1,
    limit = 6,
    sortBy = "name",
    order = "asc",
    search = "",
    ingredients = "",
  } = req.query;
  try {
    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" }; // case-insensitive search by name
    }

    if (ingredients) {
      query.components = { $all: ingredients.split(",") }; // filter by ingredients
    }

    const allCakes = await Cake.find(query)
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .exec();
    const count = allCakes.length;

    const cakes = allCakes.slice((page - 1) * limit, page * limit);

    res.json({
      cakes,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// cakeController.js
const Cake = require("../models/cakeModel");

exports.getCakes = async (req, res) => {
  try {
    const cakes = await Cake.find();
    res.json(cakes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
  const { page = 1, limit = 6 } = req.query;
  try {
    const cakes = await Cake.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Cake.countDocuments();

    res.json({
      cakes,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
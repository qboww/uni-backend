// cakeModel.js
const mongoose = require("mongoose");

const cakeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  components: {
    type: [String],
    validate: [arrayLimit, '{PATH} exceeds the limit of 5'],
    required: true
  },
  weight: { type: Number, required: true },
  price: { type: Number, required: true },
});

function arrayLimit(val) {
  return val.length <= 5;
}

const Cake = mongoose.model("Cake", cakeSchema);

module.exports = Cake;

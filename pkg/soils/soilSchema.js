const mongoose = require("mongoose");

const soilSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  ph: {
    type: Number,
    min: 0,
    max: 14,
  },
  humus: {
    type: String,
  },
  texture: {
    type: String,
  },
  color: {
    type: String,
  },
  location: {
    type: String,
  },
  seaLevel: {
    type: Number,
  },
  characteristics: {
    type: String,
  },
  culture: [{ type: String }],
  dateOfCreation: { type: Date, default: () => Date.now() },
});

const Soil = mongoose.model("Soil", soilSchema);

module.exports = Soil;

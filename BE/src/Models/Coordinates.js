const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coordinaste = new Schema(
  {
    latitude: {
      type: Number
    },
    longitude: {
      type: Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coordinaste", coordinaste);


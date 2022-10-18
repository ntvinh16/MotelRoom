const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dist = new Schema(
  {
    nameDist: {
      type: String
    },
    idCoordinates: {
      type: String
    },
    idCities: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dist", dist);


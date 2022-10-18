const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cities = new Schema(
  {
    nameCity: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("cities", cities);


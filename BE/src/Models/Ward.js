const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ward = new Schema(
  {
    nameWard: {
      type: String
    },
    idDist: {
        type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ward", ward);


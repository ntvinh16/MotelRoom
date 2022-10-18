const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const image = new Schema(
  {
    nameImage: {
      type: String
    },
    idRoom: {
        type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", image);


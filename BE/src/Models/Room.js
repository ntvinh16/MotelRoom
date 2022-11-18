const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const room = new Schema(
  {
    nameRoom: {
      type: String
    },
    address: {
        type: String
    },
    price: {
      type: Number
    },
    area: {
      type: Number
    },
    phone: {
      type: String
    },
    nameContact: {
      type: String
    },
    description: {
      type: String
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", room);


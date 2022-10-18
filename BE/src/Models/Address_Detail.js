const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const address_detail = new Schema(
  {
    nameAddress: {
      type: String
    },
    idCity: {
      type: String
    },
    idCoordinaste: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address_detail", address_detail);


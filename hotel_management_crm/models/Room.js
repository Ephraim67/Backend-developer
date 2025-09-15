const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    unique: true,
  },

  type: {
    type: String,
    required: true,
    enum: ["Standard", "Deluxe", "Suite"],
    price: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Available", "Occupied", "Maintenance"],
      default: "Available",
    },
  },
});

module.exports = mongoose.model("Room", roomSchema);

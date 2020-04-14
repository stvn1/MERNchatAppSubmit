const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    event: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Events", eventSchema);

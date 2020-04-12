const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatHistory = new Schema(
  {
    message: {
      type: String,
    },
    sender: {
      type: String,
    },
    roomname: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

let chatHistory = mongoose.model("chat", chatHistory);
module.exports = chatHistory;

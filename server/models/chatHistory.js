const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatHistory = new Schema(
  {
    content: {
      type: String,
    },
    name: {
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

// let chatHistory = mongoose.model("chat", chatHistory);
// module.exports = mongoose.model('Message', messageSchema);
module.exports = mongoose.model("chatHistory", chatHistory);

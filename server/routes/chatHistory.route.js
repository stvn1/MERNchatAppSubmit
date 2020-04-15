let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// chat Model
let chatSchema = require("../models/chatHistory");

//Read chat history
router.route("/").get((req, res) => {
  chatSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Delete chat
router.route("/delete-chat/:id").delete((req, res, next) => {
  chatSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;

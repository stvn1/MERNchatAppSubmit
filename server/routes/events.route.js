let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Events Model
let eventSchema = require("../models/events");

// READ Events
router.route("/").get((req, res) => {
  eventSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Delete Student
router.route("/delete-event/:id").delete((req, res, next) => {
  eventSchema.findByIdAndRemove(req.params.id, (error, data) => {
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

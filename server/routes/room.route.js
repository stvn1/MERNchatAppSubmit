let mongoose = require("mongoose");
express = require("express");
router = express.Router();

//Room model
let roomSchema = require("../models/room");

//Create new room
router.route("/create-room").post((req, res, next) => {
  roomSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// READ rooms
router.route("/").get((req, res) => {
  roomSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Single room
router.route("/edit-room/:id").get((req, res) => {
  roomSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update Room
router.route("/update-room/:id").put((req, res, next) => {
  roomSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Room updated successfully !");
      }
    }
  );
});

// Delete room
router.route("/delete-room/:id").delete((req, res, next) => {
  roomSchema.findByIdAndRemove(req.params.id, (error, data) => {
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

const express = require("express");
const app = express();
const http = require("http").Server(app);
const path = require("path");
const dotenv = require("dotenv");
const io = require("socket.io")(http);
const mongoose = require("mongoose");

dotenv.config();

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

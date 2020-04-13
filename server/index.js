const express = require("express");
const app = express();
const server = require("http").createServer(app);
const dotenv = require("dotenv");
const io = require("socket.io").listen(server);
const mongoose = require("mongoose");

//Routes

//Get users online
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

//Models
const chatHistory = require("./models/chatHistory");
const room = require("./models/room");
const Message = require("./models/Message");

const port = process.env.PORT || 5000;

// mongoDB connection
dotenv.config();
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

io.on("connect", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    console.log(name, room);
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    socket.join(user.room);
    chatHistory
      .find()
      .sort({ createdAt: -1 })
      .limit(10)
      .exec((err, messages) => {
        // console.log(messages[0].content);
        console.log(messages);
        if (err) return console.error(err);

        // Send the last messages to the user.
        for (let i = 0; i < messages.length; i++) {
          let userSend = messages[i].name;
          let msgSend = messages[i].content;
          socket.emit("init", {
            user: userSend,
            text: msgSend,
          });
        }
        // socket.emit("init", messages);

        //socket.emit("init", messages);
      });

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to room ${user.room}.`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    console.log(message);

    const msg = new chatHistory({
      content: message,
      name: user.name,
    });

    // Save the message to the database.
    msg.save((err) => {
      if (err) return console.error(err);
    });
    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(port, () => {
  console.log("listening on *:" + port);
});

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const dotenv = require("dotenv");
const io = require("socket.io").listen(server);
const mongoose = require("mongoose");

//Routes

//Get users online

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const port = process.env.PORT || 5000;

//mongoDB connection
// dotenv.config();
// const uri = process.env.MONGODB_URI;
// const port = process.env.PORT || 5000;

// mongoose.connect(uri, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// });

io.on("connect", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    console.log(name, room);
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    // socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    // socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

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

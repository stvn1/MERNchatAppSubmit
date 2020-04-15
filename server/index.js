const express = require("express");
const app = express();
const server = require("http").createServer(app);
const dotenv = require("dotenv");
const io = require("socket.io").listen(server);
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const cors = require("cors");
const app2 = express();
const mongoose2 = require("mongoose");
const app3 = express();
const mongoose3 = require("mongoose");

// mongoDB connection
dotenv.config();
const uri = process.env.MONGODB_URI;

//+++++++++++++ADMIN STUFF +++++++++++++++++++++++++++++++

// Express Routes
const chatRoute = require("../server/routes/chatHistory.route");
const eventssRoute = require("../server/routes/events.route");
const roomssRoute = require("../server/routes/room.route");

mongoose3.Promise = global.Promise;
mongoose3
  .connect(uri, {
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log("Database sucessfully connected!");
    },
    (error) => {
      console.log("Could not connect to database : " + error);
    }
  );

app3.use(bodyParser.json());
app3.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app3.use(cors());
app3.use("/events", eventssRoute);
app3.use("/rooms", roomssRoute);
app3.use("/chat", chatRoute);

// PORT
const port3 = process.env.PORT || 4001;
const server3 = app3.listen(port3, () => {
  console.log("Connected to port " + port3);
});

// 404 Error
app3.use((req, res, next) => {
  next(createError(404));
});

app3.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

//+++++++++++++++++++++++AUTH+++++++++++++++++++++++++++

//bodyParser middleware
app2.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app2.use(bodyParser.json());
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose2
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))

  .catch((err) => console.log(err));
app2.use(passport.initialize());

// Passport config
require("./config/passport")(passport);
// Routes
app2.use("/api/users", users);
const port2 = process.env.PORT || 4000; // process.env.port is Heroku's port if you choose to deploy the app there
app2.listen(port2, () =>
  console.log(`Server up and running on port ${port2} !`)
);

//++++++++++++++++++++SOCKET.IO STUFF ++++++++++++++++++++++++++++

//Get users online
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

//Models
const chatHistory = require("./models/chatHistory");
const chatRooms = require("./models/room");
const events = require("./models/events");

const port = process.env.PORT || 5000;

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

io.on("connect", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    chatHistory
      .find()
      .sort({ createdAt: -1 })
      .limit(10)
      .where({ roomname: room })
      .exec((err, messages) => {
        // console.log(messages[0].content);
        if (err) return console.error(err);
        // console.log(messages);

        // Send the last messages to the user.

        // for (const property in messages) {
        //   let userSend = messages[property].name;
        //   let msgSend = messages[property].content;
        //   socket.emit("init", {
        //     user: userSend,
        //     text: msgSend,
        //   });
        // }
        // var result = Object.keys(msg).map(function (key) {
        //   return [Number(key), msg[key]];
        // });
        // console.log(result);

        // for (i = messages.length - 1; i >= 0; ) {
        //   let userSend = messages[i].name;
        //   let msgSend = messages[i].content;
        //   socket.emit("init", {
        //     user: userSend,
        //     text: msgSend,
        //   });
        //   i--;
        // }
        socket.emit("init", messages);
        // socket.emit("init", messages);
      });

    // console.log(name, room);

    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    socket.join(user.room);
    //Record user joined Event
    const event = new events({
      event: `${user.name} has joined!`,
    });

    // Save the event to the database.
    event.save((err) => {
      if (err) return console.error(err);
    });

    //Chat rooms available
    chatRooms.find().exec((err, rooms) => {
      console.log(rooms);
      if (err) return console.err(err);

      socket.emit("loadRooms", rooms);
    });

    socket.emit("message", {
      user: "admin",
      content: `${user.name}, welcome to room ${user.room}.`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", content: `${user.name} has joined!` });

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
      roomname: user.room,
    });

    // Save the message to the database.
    msg.save((err) => {
      if (err) return console.error(err);
    });
    io.to(user.room).emit("message", { user: user.name, content: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        content: `${user.name} has left.`,
      });
      const event = new events({
        event: `${user.name} has left.`,
      });

      // Save the event to the database.
      event.save((err) => {
        if (err) return console.error(err);
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

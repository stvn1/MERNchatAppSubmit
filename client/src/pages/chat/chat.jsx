import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./chat.css";

//Components
import Users from "../../components/Users/users";
import InfoBar from "../../components/InfoBar/InforBar";
import Messages from "../../components/Messages/Messages";
import Input from "../../components/Input/Input";
import RoomBar from "../../components/RoomBar/RoomBar";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("general");
  const [users, setUsers] = useState("");
  //adding what i missed
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "http://localhost:5000";

  useEffect(() => {
    const { name } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    console.log(room);
    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
        window.history.back();
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("init", (msgs) => {
      console.log(msgs);
      console.log(Array.isArray(msgs));
      // console.log(msg[0].content);
      // var result = Object.keys(msg).map(function (key) {
      //   return [Number(key), msg[key]];
      // });
      // console.log(result);
      // setMessages([...messages, ...msg.reverse()]);
      setMessages([...messages, ...msgs.reverse()]);
      console.log(messages);
    });
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    socket.on("roomname", ({ roomname }) => {
      // setRoom(roomname);
      console.log("these are the rooms", roomname);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div>
      <h1>Chat page</h1>
      <div className="outerContainer">
        <RoomBar room={room} />
        <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
        <Users users={users} />
      </div>
    </div>
  );
};
export default Chat;

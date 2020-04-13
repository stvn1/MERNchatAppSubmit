import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./chat.css";

//Components
import Users from "../../components/Users/users";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("general");
  const [users, setUsers] = useState("");
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
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  });

  return (
    <div>
      <h1>Chat page</h1>
      <div className="outerContainer">
        <div className="container"></div>
        <Users users={users} />
      </div>
    </div>
  );
};
export default Chat;

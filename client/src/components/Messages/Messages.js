import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message/Message";

import "./Messages.css";

const Messages = ({ messages, name }) => (
  <ScrollToBottom className="messages">
    {messages.map(({ name, content }, i) => {
      const actualMessage = { user: name, text: content };
      return (
        <div key={i}>
          <Message message={actualMessage} name={name} />
        </div>
      );
    })}
  </ScrollToBottom>
);

export default Messages;

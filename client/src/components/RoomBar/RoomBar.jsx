import React from "react";

// import onlineIcon from "../../icons/onlineIcon.png";

import "./roomBar.css";

const RoomBar = ({ room }) => (
  <div className="RoomBar">
    {room ? (
      <div>
        <h1>Rooms online:</h1>
        <div className="activeContainer">
          <h2>
            {/* {room.map(({ room }) => (
              <div key={room}>@{room}</div>
            ))} */}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);
export default RoomBar;

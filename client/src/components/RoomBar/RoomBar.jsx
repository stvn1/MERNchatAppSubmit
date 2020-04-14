import React from "react";

// import onlineIcon from "../../icons/onlineIcon.png";
import { Grid, Button } from "@material-ui/core";

import "./roomBar.css";

const useStyles = () => ({
  button: {
    color: "white",
    marginLeft: "5%",
    width: "60%",
  },
});

const RoomBar = ({ room }) => {
  return (
    <div className="room">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          Chats available
          <Button
            style={{
              borderRadius: 35,
              backgroundColor: "#21b6ae",
              padding: "18px 36px",
              fontSize: "18px",
            }}
          >
            @{room}
            {/* {room.map(({ room }) => (
              <div key={room} className="activeItem">
                {room}
              </div>
            ))} */}
          </Button>
          <Button
            style={{
              borderRadius: 35,
              backgroundColor: "#21b6ae",
              padding: "18px 36px",
              fontSize: "18px",
            }}
            onClick={() => {}}
          >
            @anotherChat
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
export default RoomBar;

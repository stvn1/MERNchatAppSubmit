import React from "react";

// import onlineIcon from "../../icons/onlineIcon.png";
import { Grid, Button } from "@material-ui/core";

import "./roomBar.css";

const useStyles = () => ({
  button: {
    marginLeft: "5%",
    width: "60%",
  },
});

const RoomBar = ({ rooms }) => (
  <div className="rooms">
    {rooms ? (
      <div>
        <h1>Chats available:</h1>
        <div className="activeContainer">
          <h2>
            {rooms.map(({ name }) => (
              <button key={name}>@{name}</button>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
  //   <div>

  //     {/* {rooms.map(({ name }, i) => {
  //       // const actualMessage = { user: name, text: content };
  //       return (
  //         <div key={name}>
  //           <h2>{name}</h2>
  //         </div>
  //       );
  //     })}

  // {users.map(({ name }) => (
  //               <div key={name} className="activeItem">
  //                 {name}
  //                 <img alt="Online Icon" src={onlineIcon} />
  //               </div>
  //             ))} */}

  //     {/* <h2>
  //       {rooms.map(({ rooms }) => (
  //         <div key={rooms} className="activeItem">
  //           {rooms}
  //         </div>
  //       ))}
  //     </h2> */}
  //   </div>
);

// const RoomBar = ({ room }) => {
//   return (
//     <div className="room">
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           Chats available
//           <Button
//             style={{
//               borderRadius: 35,
//               backgroundColor: "#21b6ae",
//               padding: "18px 36px",
//               fontSize: "18px",
//             }}
//           >
//             @{room}
//             {/* {room.map(({ room }) => (
//               <div key={room} className="activeItem">
//                 {room}
//               </div>
//             ))} */}
//           </Button>
//           <Button
//             style={{
//               borderRadius: 35,
//               backgroundColor: "#21b6ae",
//               padding: "18px 36px",
//               fontSize: "18px",
//             }}
//             onClick={() => {}}
//           >
//             @anotherChat
//           </Button>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };
export default RoomBar;

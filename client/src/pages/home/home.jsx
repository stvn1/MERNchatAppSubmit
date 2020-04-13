import React, { useState } from "react";
import { Link } from "react-router-dom";

//component
import Navbar from "../../components/NavBar/NavBar";

//stylesheet
import "./home.css";

const Home = () => {
  const [name, setName] = useState("");

  return (
    <div className="joinOuterContainer">
      <Navbar />
      <div className="joineInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <Link
          onClick={(event) =>
            // prettier-ignore
            !name ? (event.preventDefault() , alert("Please enter a name")) : null
          }
          to={`/chat?name=${name}`}
        >
          <button className="button mt-20" type="submit">
            Join to chat
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

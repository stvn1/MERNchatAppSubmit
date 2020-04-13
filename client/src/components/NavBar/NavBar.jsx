import React, { Component } from "react";
import { Link } from "react-router-dom";

//Material-ui stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/ToolBar";
import Button from "@material-ui/core/Button";

class NavBar extends Component {
  render() {
    return (
      <AppBar style={{ background: "#2E3B55" }}>
        <Toolbar className="nav-container">
          <Button color="inherit" component={Link} to="/login">
            Admin Log In
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default NavBar;

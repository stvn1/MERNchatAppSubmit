import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

//Pages
import Chat from "./pages/chat/chat";
import Home from "./pages/home/home";
import Login from "./pages/login/login";

import Admin from "./pages/AdminTest";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/chat" component={Chat} />
          <Route exact path="/login" component={Login} />
          {/* <Route exact path="/admin" component={Admin} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;

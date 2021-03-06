import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

//Pages
import Chat from "./pages/chat/chat";
import Home from "./pages/home/home";
import Login from "./pages/login/login";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/chat" component={Chat} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

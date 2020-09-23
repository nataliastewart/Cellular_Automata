import React from "react";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Game from "./Game";

export default function App() {
  return (
    <div className="App-wrap">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/app" component={Game} />
        </Switch>
      </Router>
    </div>
  );
}

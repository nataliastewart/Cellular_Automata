import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from "./App";
import "./Home.css";
export default function Home() {
  return (
    <Router>
      <div className="Home-head">
        <h2>Welcome!</h2>
      </div>
      <div className="Home">
        <Route exact path="/app" component={App} />
        <li>
          <Link className="Home-link" to="/app">
            <p>Click here to play the Game!</p>
          </Link>
        </li>{" "}
      </div>
    </Router>
  );
}

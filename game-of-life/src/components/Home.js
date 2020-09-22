import React from "react";
import { Link } from "react-router-dom";

import "../styling/Home.css";
export default function Home() {
  return (
    <div className="Home-head">
      <h2>Welcome!</h2>
      <li>
        <Link className="Home-link" to="/app">
          <p>Click here to play the Game!</p>
        </Link>
      </li>
    </div>
  );
}

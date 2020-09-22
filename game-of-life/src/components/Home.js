import React from "react";
import { Link } from "react-router-dom";

import "../styling/Home.css";
export default function Home() {
  return (
    <div className="Home-wrap">
      <h2 class="neon">The Game of Life </h2>
      <img
        src={
          "https://camo.githubusercontent.com/32a6b1daed761b24dfef7d47fbd22f0be0bb51b2/68747470733a2f2f746b2d6173736574732e6c616d6264617363686f6f6c2e636f6d2f39616630663537362d376632312d343133332d393164662d3930373531353931326466355f636f6e7761792e676966"
        }
        className="Game-logo"
        alt="cellular automata"
      />
      <Link className="Home-link" to="/app">
        <p class="flux">PLAY!</p>
      </Link>
    </div>
  );
}

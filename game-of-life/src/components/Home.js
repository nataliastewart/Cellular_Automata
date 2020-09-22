import React from "react";
import { Link } from "react-router-dom";

import "../styling/Home.css";
export default function Home() {
  return (
    <div className="Home-wrap">
      <h2 class="neon">The Game of Life </h2>
      {/* <img
        src={
          "https://camo.githubusercontent.com/32a6b1daed761b24dfef7d47fbd22f0be0bb51b2/68747470733a2f2f746b2d6173736574732e6c616d6264617363686f6f6c2e636f6d2f39616630663537362d376632312d343133332d393164662d3930373531353931326466355f636f6e7761792e676966"
        }
        className="Game-logo"
        alt="cellular automata"
      /> */}
      <img
        src={
          "https://upload.wikimedia.org/wikipedia/commons/6/64/Trefoil_knot_conways_game_of_life.gif"
        }
        className="Game-logo"
        alt="cellular automata"
      />
      <Link className="Home-link" to="/app">
        <p class="flux">Click to PLAY!</p>
      </Link>
      <div className="wrap-content">
        <div className="history">
          <h3>I little bit of the history... </h3>

          <p>
            The Game of Life, also known simply as Life, is a cellular automaton
            devised by the British mathematician John Horton Conway in 1970. It
            is a zero-player game, meaning that its evolution is determined by
            its initial state, requiring no further input. One interacts with
            the Game of Life by creating an initial configuration and observing
            how it evolves.
          </p>
        </div>
        <div className="rules">
          <h3>Rules </h3>

          <p>
            1. Any live cell with fewer than two live neighbours dies, as if by
            underpopulation.
          </p>
          <p>
            2. Any live cell with two or three live neighbours lives on to the
            next generation.
          </p>
          <p>
            {" "}
            3. Any live cell with more than three live neighbours dies, as if by
            overpopulation.
          </p>
          <p>
            4. Any dead cell with exactly three live neighbours becomes a live
            cell, as if by reproduction.
          </p>
        </div>
      </div>
    </div>
  );
}

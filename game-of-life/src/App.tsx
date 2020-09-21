import React, { useState } from "react";
import "./App.css";
import produce from "immer";

const numRows = 50;
const numCols = 50;

const App: React.FC = () => {
  //create a Grid - Grid state - values are constantly changing
  const [grid, setGrid] = useState(() => {
    const rows = [];
    //interate to create the rows and cols
    for (let i = 0; i < numRows; i++) {
      //when create the row, push a cols array with value 0 as well
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  });

  return (
    <div
      className="App"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numCols}, 20px)`,
      }}
    >
      {grid.map((rows, i) =>
        rows.map((col, k) => (
          //onClick will mutate the grid state to = 1 (live) and will turn into green
          <div
            key={`${i}-${k}`}
            onClick={() => {
              const newGrid = produce(grid, (gridCopy) => {
                //toggle the state live/dead
                gridCopy[i][k] = grid[i][k] ? 0 : 1;
              });
              setGrid(newGrid);
            }}
            style={{
              width: 20,
              height: 20,
              backgroundColor: grid[i][k] ? "LawnGreen" : undefined,
              border: "solid 1px black",
            }}
          />
        ))
      )}
    </div>
  );
};

export default App;

//  <h2>Welcome to John Conway's "Game of Life"</h2>
//       <img
//         src={
//           "https://camo.githubusercontent.com/32a6b1daed761b24dfef7d47fbd22f0be0bb51b2/68747470733a2f2f746b2d6173736574732e6c616d6264617363686f6f6c2e636f6d2f39616630663537362d376632312d343133332d393164662d3930373531353931326466355f636f6e7761792e676966"
//         }
//         className="game-logo"
//         alt="cellular automata"
//       />

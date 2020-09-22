import React, { useState, useCallback, useRef } from "react";
import "../styling/App.css";
import produce from "immer";
import { Link } from "react-router-dom";

const numRows = 50;
const numCols = 50;

//array of operations for the Rules logic - checking the neighbors state:
//each one of the neighbors location is represented by one operation
const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const generateEmptyGrid = () => {
  const rows = [];
  //interate to create the rows and cols
  for (let i = 0; i < numRows; i++) {
    //when create the row, push a cols array with value 0 as well
    rows.push(Array.from(Array(numCols), () => 0));
  }

  return rows;
};

function App() {
  //create a Grid - Grid state - values are constantly changing
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  const [running, setRunning] = useState(false);

  //using useRef hook => the reference of the value of running will be watched and can be updated
  const runningRef = useRef(running);
  runningRef.current = running;

  //don't recreate this function every render. useCallback hook - only create the function once
  const runSimulation = useCallback(() => {
    //checking if simulation is running
    if (!runningRef.current) {
      //if running = false -> return (die - stop)
      return;
    }

    setGrid((g) => {
      //go over each current cell "g"
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            //check the numbers of neighbors of the current cell "g"
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              //checking to make sure we are not going above or below of what we can go as values
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                //if we have a live cell = 1 will add +1 to the neighbors
                //that's going to tell us for a given cell, how many neighbors it has.
                neighbors += g[newI][newK];
              }
            });

            //R U L ES :
            //01.Any live cell with fewer than two live neighbours dies, as if by underpopulation.
            //03.Any live cell with more than three live neighbours dies, as if by overpopulation.
            if (neighbors < 2 || neighbors > 3) {
              //the current position "g" dies => turn into gridCopy = 0
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              //04.Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    //simulate
    //call itself function again
    setTimeout(runSimulation, 100);
  }, []);

  return (
    <div className="App-game">
      <Link to="/">Home</Link>
      <div className="wrap-buttons">
        <button
          className="start-stop"
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}
        >
          {running ? "Stop" : "Start"}
        </button>

        <button
          onClick={() => {
            const rows = [];
            for (let i = 0; i < numRows; i++) {
              rows.push(
                Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
              );
            }

            setGrid(rows);
          }}
        >
          Random
        </button>
        <button
          onClick={() => {
            setGrid(generateEmptyGrid());
          }}
        >
          Clear
        </button>
      </div>
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
                border: "solid 1px orange",
                borderRadius: 5,
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;

//  <h2>Welcome to John Conway's "Game of Life"</h2>
//       <img
//         src={
//           "https://camo.githubusercontent.com/32a6b1daed761b24dfef7d47fbd22f0be0bb51b2/68747470733a2f2f746b2d6173736574732e6c616d6264617363686f6f6c2e636f6d2f39616630663537362d376632312d343133332d393164662d3930373531353931326466355f636f6e7761792e676966"
//         }
//         className="game-logo"
//         alt="cellular automata"
//       />

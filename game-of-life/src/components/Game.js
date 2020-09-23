import React, { useState, useCallback, useRef } from "react";
import "../styling/App.css";
import produce from "immer";
import { Link } from "react-router-dom";

let numRows = 30;
let numCols = 50;

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
  const [generation, setGeneration] = useState(0);

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

  const gridSizeOne = (size) => {
    switch (size) {
      default:
        numCols = 15;
        numRows = 15;
        break;
    }
    setGrid(generateEmptyGrid);
  };

  const gridSizeTwo = (size) => {
    switch (size) {
      default:
        numCols = 50;
        numRows = 50;
        break;
    }
    setGrid(generateEmptyGrid);
  };

  const handleSizeOne = (e) => {
    gridSizeOne(e);
  };

  const handleSizeTwo = (e) => {
    gridSizeTwo(e);
  };
  return (
    <div className="App-game">
      <div className="header">
        <Link to="/">Home</Link>
        {/* <p className="titleApp">Generation : {runSimulation}</p> */}
      </div>

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
          className="Radom"
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
          className="Clear"
          onClick={() => {
            setGrid(generateEmptyGrid());
          }}
        >
          Clear
        </button>

        <button onClick={handleSizeOne} value="1">
          Grid Size 15X15
        </button>
        <button onClick={handleSizeTwo} value="2">
          Grid Size 50X50
        </button>

        {/* <select name="type" onChange={handleSize}>
          <option value="1">20x10</option>
          <option value="2">50x30</option>
          <option value="3">70x50</option>
        </select> */}
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
                backgroundColor: grid[i][k] ? "#39e600" : undefined,
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

import React, { useState } from "react";
import TabuSearch from "./TabuSearch";
import "./App.css"; // Import the CSS file
import { Slider } from "@mui/material";

function App() {
  // const [numRows, setNumRows] = useState(4);
  // const [numCols, setNumCols] = useState(4);
  const [matrixSize,setMAtrixSize] = useState(4);
  const [distanceMatrix, setDistanceMatrix] = useState(
    createInitialMatrix(matrixSize)
  );

  const handleMatrixSizeChange = (event) => {
    const value = parseInt(event.target.value);
    setMAtrixSize(isNaN(value) ? 0 : value);
    setDistanceMatrix(createInitialMatrix(value));
  }

  // const handleNumRowsChange = (event) => {
  //   const value = parseInt(event.target.value);
  //   setNumRows(isNaN(value) ? 0 : value);
  //   setDistanceMatrix(createInitialMatrix(value, numCols));
  // };

  // const handleNumColsChange = (event) => {
  //   const value = parseInt(event.target.value);
  //   setNumCols(isNaN(value) ? 0 : value);
  //   setDistanceMatrix(createInitialMatrix(numRows, value));
  // };

  const handleDistanceMatrixChange = (event, row, col) => {
    const value = parseInt(event.target.value);
    const updatedMatrix = [...distanceMatrix];
    updatedMatrix[row][col] = isNaN(value) ? 0 : value;
    setDistanceMatrix(updatedMatrix);
  };

  // const handleDistanceMatrixChange = (event,size) => {
  //   const value = parseInt(event.target.value);
  //   const updatedMatrix = [...distanceMatrix];
  //   updatedMatrix[size][size] = isNaN(value) ? 0 : value;
  //   setDistanceMatrix(updatedMatrix);
  // }

  function createInitialMatrix(size) {
    const matrix = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(0);
      }
      matrix.push(row);
    }
    return matrix;
  }

  return (
    <div className="App">
      <h1>Traveling Salesman Problem Solver with Tabu Search</h1>
      <h2>Enter Custom Distance Matrix: </h2>
      <div>
        <Slider
          style={{
            margin: "50px",
            maxWidth: "400px",
          }}
          aria-label="Temperature"
          defaultValue={4}
          valueLabelDisplay="on"
          shiftStep={1}
          step={1}
          min={3}
          max={15}
          onChange={handleMatrixSizeChange}
        />
      </div>
      <table style={{ backgroundColor: "gray" }}>
        <tbody>
          {distanceMatrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((col, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="number"
                    value={col}
                    onChange={(event) =>
                      handleDistanceMatrixChange(event, rowIndex, colIndex)
                    }
                    style={{
                      fontFamily: "monospace",
                      backgroundColor: "black",
                      color: "#04c1f8",
                      border: "none",
                      textAlign: "center",
                      width: "40px",
                      height: "40px",
                      fontSize: "24px",
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <TabuSearch distanceMatrix={distanceMatrix} />
    </div>
  );
}

export default App;

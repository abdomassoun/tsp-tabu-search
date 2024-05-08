import React, { useState } from "react";
import TabuSearch from "./TabuSearch";
import "./App.css"; // Import the CSS file
import { Slider } from "@mui/material";

function App() {
  const [numRows, setNumRows] = useState(4);
  const [numCols, setNumCols] = useState(4);
  const [distanceMatrix, setDistanceMatrix] = useState(
    createInitialMatrix(numRows, numCols)
  );

  const handleNumRowsChange = (event) => {
    const value = parseInt(event.target.value);
    setNumRows(isNaN(value) ? 0 : value);
    setDistanceMatrix(createInitialMatrix(value, numCols));
  };

  const handleNumColsChange = (event) => {
    const value = parseInt(event.target.value);
    setNumCols(isNaN(value) ? 0 : value);
    setDistanceMatrix(createInitialMatrix(numRows, value));
  };

  const handleDistanceMatrixChange = (event, row, col) => {
    const value = parseInt(event.target.value);
    const updatedMatrix = [...distanceMatrix];
    updatedMatrix[row][col] = isNaN(value) ? 0 : value;
    setDistanceMatrix(updatedMatrix);
  };

  function createInitialMatrix(rows, cols) {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push(0);
      }
      matrix.push(row);
    }
    return matrix;
  }

  return (
    <div className="App">
      <h1>Traveling Salesman Problem Solver with Tabu Search</h1>
      <h2>Enter Custom Distance Matrix:</h2>
      <div>
        <label>Number of Rows:</label>
        <input type="number" value={numRows} onChange={handleNumRowsChange} />
      </div>
      <div>
        <label>Number of Columns:</label>
        <Slider
          aria-label="Temperature"
          defaultValue={30}
          // getAriaValueText={numCols}
          valueLabelDisplay="auto"
          shiftStep={1}
          step={1}
          marks
          min={3}
          max={15}
          onChange={handleNumColsChange}
        />
        {/* <input type="number" value={numCols} onChange={handleNumColsChange} /> */}
      </div>
      <table>
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

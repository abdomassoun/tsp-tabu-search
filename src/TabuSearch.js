import React, { useState, useEffect } from 'react';

function TabuSearch({ distanceMatrix }) {
  const [bestTour, setBestTour] = useState([]);
  const [bestTourLength, setBestTourLength] = useState(Number.MAX_SAFE_INTEGER);
  const [tabuList, setTabuList] = useState([]);
  const [iterations, setIterations] = useState(1000);

  useEffect(() => {
    // Define functions to calculate tour length and generate initial solution
    const calculateTourLength = (tour) => {
      let length = 0;
      for (let i = 0; i < tour.length - 1; i++) {
        length += distanceMatrix[tour[i]][tour[i + 1]];
      }
      // Add distance from last city back to the starting city
      length += distanceMatrix[tour[tour.length - 1]][tour[0]];
      return length;
    };

    const generateInitialSolution = () => {
      const initialTour = Array.from({ length: distanceMatrix.length }, (_, i) => i);
      // Randomly shuffle the initial tour
      for (let i = initialTour.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [initialTour[i], initialTour[j]] = [initialTour[j], initialTour[i]];
      }
      return initialTour;
    };

    // Initialize best tour with the initial solution
    let currentTour = generateInitialSolution();
    let currentTourLength = calculateTourLength(currentTour);
    setBestTour(currentTour);
    setBestTourLength(currentTourLength);

    // Start tabu search algorithm
    for (let i = 0; i < iterations; i++) {
      // Generate neighboring solutions by swapping cities
      let newTour = [...currentTour];
      let newTourLength = currentTourLength;
      let bestNeighbor = null;
      let bestNeighborLength = Number.MAX_SAFE_INTEGER;

      for (let j = 0; j < distanceMatrix.length - 1; j++) {
        for (let k = j + 1; k < distanceMatrix.length; k++) {
          // Swap cities at positions j and k in the tour
          [newTour[j], newTour[k]] = [newTour[k], newTour[j]];
          newTourLength = calculateTourLength(newTour);

          // Check if the new tour is better than the current best tour and not in tabu list
          if (newTourLength < bestNeighborLength && !tabuList.includes(`${j},${k}`)) {
            bestNeighbor = [...newTour];
            bestNeighborLength = newTourLength;
          }

          // Revert the swap
          [newTour[j], newTour[k]] = [newTour[k], newTour[j]];
        }
      }

      // Update current tour and best tour if a better neighbor is found
      if (bestNeighbor) {
        currentTour = bestNeighbor;
        currentTourLength = bestNeighborLength;
        setBestTour(currentTour);
        setBestTourLength(currentTourLength);
      }

      // Update tabu list: Add the swap that led to the best neighbor
      if (bestNeighbor) {
        const tabuMove = `${currentTour.indexOf(bestNeighbor[0])},${currentTour.indexOf(bestNeighbor[1])}`;
        setTabuList([...tabuList, tabuMove]);
      }

      // Remove oldest moves from tabu list if it exceeds a certain length
      if (tabuList.length > distanceMatrix.length / 2) {
        setTabuList(tabuList.slice(1));
      }
    }
  }, [distanceMatrix, iterations]);

  return (
    <div>
      <h2>Best Tour: {bestTour.join(' -> ')} -> {bestTour[0]}</h2>
      <h2>Best Tour Length: {bestTourLength}</h2>
    </div>
  );
}

export default TabuSearch;

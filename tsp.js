function objectiveFunction(solution) {
    // TODO: Implement your objective function here
    // The objective function should evaluate
    // the quality of a given solution and
    // return a numerical value representing
    // the solution's fitness
    // Example: return solution.reduce((sum, val) => sum + val, 0);
    return solution.reduce((sum, val) => sum + val, 0);
}

function getNeighbors(solution) {
    const neighbors = [];
    for (let i = 0; i < solution.length; i++) {
        for (let j = i + 1; j < solution.length; j++) {
            const neighbor = [...solution];
            // Swap elements at indices i and j
            [neighbor[i], neighbor[j]] = [neighbor[j], neighbor[i]];
            neighbors.push(neighbor);
        }
    }
    return neighbors;
}

function tabuSearch(initialSolution, maxIterations, tabuListSize) {
    let bestSolution = [...initialSolution];
    let currentSolution = [...initialSolution];
    const tabuList = [];

    for (let iter = 0; iter < maxIterations; iter++) {
        const neighbors = getNeighbors(currentSolution);
        let bestNeighbor = [];
        let bestNeighborFitness = Number.MAX_VALUE;

        for (const neighbor of neighbors) {
            if (!tabuList.some(entry => JSON.stringify(entry) === JSON.stringify(neighbor))) {
                const neighborFitness = objectiveFunction(neighbor);
                if (neighborFitness < bestNeighborFitness) {
                    bestNeighbor = [...neighbor];
                    bestNeighborFitness = neighborFitness;
                }
            }
        }

        if (bestNeighbor.length === 0) {
            // No non-tabu neighbors found, terminate the search
            break;
        }

        currentSolution = [...bestNeighbor];
        tabuList.push([...bestNeighbor]);

        if (tabuList.length > tabuListSize) {
            // Remove the oldest entry from the tabu list if it exceeds the size
            tabuList.shift();
        }

        if (objectiveFunction(bestNeighbor) < objectiveFunction(bestSolution)) {
            // Update the best solution if the current neighbor is better
            bestSolution = [...bestNeighbor];
        }
    }

    return bestSolution;
}

// Example usage
const initialSolution = [1, 2, 3, 4, 5];
const maxIterations = 100;
const tabuListSize = 10;

const bestSolution = tabuSearch(initialSolution, maxIterations, tabuListSize);
console.log("Best solution:", bestSolution.join(" "));
console.log("Best solution fitness:", objectiveFunction(bestSolution));

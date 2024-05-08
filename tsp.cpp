#include <algorithm>
#include <iostream>
#include <limits>
#include <numeric>
#include <vector>
using namespace std;
// Define the objective function for TSP using a distance matrix
double objective_function(const vector<int>& solution, const vector<vector<double>>& distance_matrix) {
double total_distance = 0.0;
for (size_t i = 0; i < solution.size() - 1; ++i) {
total_distance += distance_matrix[solution[i]][solution[i + 1]];
}
// Add distance from the last city back to the starting city
total_distance += distance_matrix[solution.back()][solution[0]];
return total_distance;
}
// Modify the get_neighbors function to generate TSP-specific neighbors
vector<vector<int>> get_neighbors(const vector<int>& solution) {
vector<vector<int>> neighbors;
for (size_t i = 0; i < solution.size() - 1; ++i) {
for (size_t j = i + 1; j < solution.size(); ++j) {
vector<int> neighbor = solution;
swap(neighbor[i], neighbor[j]);
neighbors.push_back(neighbor);
}
}
return neighbors;
}
// Rest of the code remains the same
int main() {
// Example usage
// Define the distance matrix
vector<vector<double>> distance_matrix = {
{0.0, 2.0, 3.0, 4.0, 5.0},
{2.0, 0.0, 1.0, 2.0, 3.0},
{3.0, 1.0, 0.0, 1.0, 2.0},
{4.0, 2.0, 1.0, 0.0, 1.0},
{5.0, 3.0, 2.0, 1.0, 0.0}
};
// Provide an initial solution
vector<int> initial_solution = { 0, 1, 2, 3, 4 }; // Assuming starting from city 0
int max_iterations = 100;
int tabu_list_size = 10;
vector<int> best_solution = tabu_search(initial_solution, max_iterations, tabu_list_size);
cout << "Best solution:";
for (int val : best_solution) {
cout << " " << val;
}
cout << endl;
cout << "Best solution total distance: " << objective_function(best_solution, distance_matrix) << endl;
return 0;
}
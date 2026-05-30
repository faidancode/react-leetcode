// Given a positive integer n, generate an n x n matrix filled with elements from 1 to n2 in spiral order.

// Input: n = 3
// Output: [[1,2,3],[8,9,4],[7,6,5]]

// Simulation Algorithm using a Boundary-Based Greedy Approach

function generateMatrix(n) {
    // Step 1: Initialize an empty n x n matrix filled with 0s
    const matrix = Array.from({ length: n }, () => Array(n).fill(0));
    
    // Step 2: Define the boundaries of the matrix
    let top = 0;
    let bottom = n - 1;
    let left = 0;
    let right = n - 1;
    
    // The starting number to place in the matrix
    let num = 1;
    const maxNum = n * n;

    // Step 3: Loop until we have filled all numbers from 1 to n^2
    while (num <= maxNum) {
        
        // Direction 1: Move from Left to Right along the current 'top' row
        for (let i = left; i <= right; i++) {
            matrix[top][i] = num++;
        }
        top++; // Narrow the top boundary downward

        // Direction 2: Move from Top to Bottom along the current 'right' column
        for (let i = top; i <= bottom; i++) {
            matrix[i][right] = num++;
        }
        right--; // Narrow the right boundary leftward

        // Direction 3: Move from Right to Left along the current 'bottom' row
        for (let i = right; i >= left; i--) {
            matrix[bottom][i] = num++;
        }
        bottom--; // Narrow the bottom boundary upward

        // Direction 4: Move from Bottom to Top along the current 'left' column
        for (let i = bottom; i >= top; i--) {
            matrix[i][left] = num++;
        }
        left++; // Narrow the left boundary rightward
    }

    return matrix;
}

// Step-by-Step Simulation (For n = 3)
// Initially, our boundaries are: top = 0, bottom = 2, left = 0, right = 2.

// - First Top Row (Left $\rightarrow$ Right): Fills row 0 from col 0 to 2. Matrix becomes:[[1, 2, 3], [0, 0, 0], [0, 0, 0]]. top increases to 1.
// - Right Column (Top $\rightarrow$ Bottom): Fills col 2 from row 1 to 2. Matrix becomes:[[1, 2, 3], [0, 0, 4], [0, 0, 5]]. right decreases to 1.
// - Bottom Row (Right $\rightarrow$ Left): Fills row 2 from col 1 to 0. Matrix becomes:[[1, 2, 3], [0, 0, 4], [7, 6, 5]]. bottom decreases to 1.
// - Left Column (Bottom $\rightarrow$ Top): Fills col 0 at row 1. Matrix becomes:[[1, 2, 3], [8, 0, 4], [7, 6, 5]]. left increases to 1.

// On the next loop iteration, top = 1, bottom = 1, left = 1, right = 1. The first inner loop runs exactly once to insert 9 at matrix[1][1], completing the grid.
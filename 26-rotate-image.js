// Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.
//  
// Example 1:
// Input: nums = [1,1,2]Output:
// [[1,1,2],
//  [1,2,1],
//  [2,1,1]]
// Example 2:
// Input: nums = [1,2,3]Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]


// Transpose and Reflect Algorithm

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix) {
    const n = matrix.length;

    // Step 1: Transpose the matrix
    // We only iterate through the upper triangle (j > i) to avoid swapping elements twice.
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            // Swap matrix[i][j] with matrix[j][i]
            const temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }

    // Step 2: Reverse each row horizontally
    for (let i = 0; i < n; i++) {
        let left = 0;
        let right = n - 1;
        
        // Classic two-pointer approach to reverse the row elements in-place
        while (left < right) {
            const temp = matrix[i][left];
            matrix[i][left] = matrix[i][right];
            matrix[i][right] = temp;
            
            left++;
            right--;
        }
    }
}

// Original
// [1, 2, 3]
// [4, 5, 6]
// [7, 8, 9]

// **After Step 1 (Transpose):** Notice how rows became columns (`[1, 2, 3]` is now the first vertical column).  
// [1, 4, 7]
// [2, 5, 8]
// [3, 6, 9]

// After Step 2 (Reverse Rows): Every horizontal line is flipped, matching a perfect 90-degree shift.
// [7, 4, 1]
// [8, 5, 2]
// [9, 6, 3]
// Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

// The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

// The test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.

// Input: candidates = [2,3,6,7], target = 7
// Output: [[2,2,3],[7]]
// Explanation:
// 2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.

// Backtrack Algorithm

/**
 * Function to find all unique combinations that sum up to the target.
 * @param {number[]} candidates - Array of distinct integers.
 * @param {number} target - The target sum.
 * @return {number[][]} - List of all unique combinations.
 */
function combinationSum(candidates, target) {
  const result = [];

  /**
   * Helper function to perform backtracking.
   * @param {number} index - Current candidate index we are exploring.
   * @param {number[]} currentCombination - The ongoing combination of numbers.
   * @param {number} currentSum - The sum of elements in currentCombination.
   */
  function backtrack(index, currentCombination, currentSum) {
    // Base Case 1: If the current sum matches the target, we found a valid combination
    if (currentSum === target) {
      result.push([...currentCombination]); // Push a deep copy of the array
      return;
    }

    // Base Case 2: If the current sum exceeds the target, stop exploring this path
    if (currentSum > target) {
      return;
    }

    // Explore choices starting from the current index to avoid duplicate combinations
    for (let i = index; i < candidates.length; i++) {
      // 1. Choose: Add the current candidate to our tracking array
      currentCombination.push(candidates[i]);

      // 2. Explore: Recurse with the same index 'i' since numbers can be reused
      backtrack(i, currentCombination, currentSum + candidates[i]);

      // 3. Unchoose: Backtrack by removing the last element we added
      currentCombination.pop();
    }
  }

  // Start the backtracking process from the 0th index
  backtrack(0, [], 0);
  return result;
}

// Code Explanation

// This problem is solved efficiently using Backtracking, which explores all possible combinations by building them step-by-step and abandoning a path ("backtracking") as soon as it determines the path cannot lead to a valid solution.

// 1. The Result Store: We initialize an empty array result to hold all valid combinations.

// 2.The Backtracking Function (backtrack): This helper function tracks three pieces of state:

// -- index: The current candidate element we are inspecting.

// -- currentCombination: An array holding the elements chosen so far in the current path.

// -- currentSum: The running sum of the elements inside currentCombination.

// 3. Base Cases:

// -- Success: If currentSum === target, we clone the currentCombination using the spread operator ([...currentCombination]) and push it to the result.

// -- Failure: If currentSum > target, the sum has exceeded our goal. Since all candidates are positive integers, adding more numbers will only increase the sum, so we return early to prune this branch.

// 4. The Loop and the "Same Element" Reuse:

// -- The for loop starts at index instead of 0. This is the mechanism that prevents duplicate combinations (like [2, 3, 2] and [2, 2, 3]). By only looking forward or staying on the same element, we enforce a strict order.

// -- When calling backtrack(i, ...), we pass i instead of i + 1. This allows the algorithm to reuse the exact same number multiple times.
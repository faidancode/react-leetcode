// Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.

// Each number in candidates may only be used once in the combination.

// Note: The solution set must not contain duplicate combinations.

// Input: candidates = [10,1,2,7,6,1,5], target = 8
// Output:
// [
// [1,1,6],
// [1,2,5],
// [1,7],
// [2,6]
// ]

// Backtrack ALgorithm

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
function combinationSum2(candidates, target) {
  const result = [];

  // 1. Sort the candidates first.
  // This is crucial for grouping identical numbers together to eliminate duplicates.
  candidates.sort((a, b) => a - b);

  // 2. Define the backtracking helper function
  function backtrack(remainingTarget, currentCombination, startIndex) {
    // Base case 1: If the remaining target is 0, a valid combination is found
    if (remainingTarget === 0) {
      result.push([...currentCombination]);
      return;
    }

    // Base case 2: If the target becomes negative, stop exploring this path
    if (remainingTarget < 0) {
      return;
    }

    // Iterate through the candidates starting from startIndex
    for (let i = startIndex; i < candidates.length; i++) {
      // Duplicate Elimination Trick:
      // If the current number is the same as the previous number AT THE SAME LEVEL of recursion,
      // skip it to avoid generating duplicate combination sets.
      if (i > startIndex && candidates[i] === candidates[i - 1]) {
        continue;
      }

      // Optimization (Early Pruning):
      // Since the array is sorted, if the current number exceeds the remaining target,
      // all subsequent numbers will also exceed it. We can safely break the loop.
      if (candidates[i] > remainingTarget) {
        break;
      }

      // Backtracking Steps:
      // a. Choose: Add the candidate to the current combination
      currentCombination.push(candidates[i]);

      // b. Explore: Move deeper into the recursion tree.
      // Pass `i + 1` because each element can only be used once.
      backtrack(remainingTarget - candidates[i], currentCombination, i + 1);

      // c. Unchoose: Remove the last added number (backtrack) to try other options
      currentCombination.pop();
    }
  }

  // Start backtracking with the initial target, an empty combination, and starting index 0
  backtrack(target, [], 0);

  return result;
}

// Detailed Explanation

// 1. Why Sorting (.sort()) is Required
// Sorting the candidates array serves two major purposes:

// - Duplicate Prevention: It places identical numbers next to each other (e.g., [1, 1, 2, 5...]). This makes it easy to detect when we are about to start a new branch with a number we just finished evaluating.

// - Early Pruning: If we are looking for a remainder of 3, and we hit a candidate like 5, we know that every number after 5 is also too large. Breaking the loop early saves unnecessary computing time.

// 2. De-duplication Logic (i > startIndex && candidates[i] === candidates[i - 1])
// This condition is the core trick of the problem:

// - When moving deeply (vertically down the recursion tree), we are allowed to use duplicate numbers if they are at different indices. For example, using the 1 at index 0 and the 1 at index 1 together to form [1, 1, 6] is completely valid.

// - However, when moving horizontally within the same for loop iteration (the same level of the decision tree), if index 0 has already been fully explored, we must skip index 1 if it holds the exact same value. Otherwise, it would spawn an identical subtree and generate duplicate combinations.
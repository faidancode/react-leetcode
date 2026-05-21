// Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

// Example 1:

// Input: nums = [1,2,3]
// Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
// Example 2:

// Input: nums = [0,1]
// Output: [[0,1],[1,0]]
// Example 3:

// Input: nums = [1]
// Output: [[1]]

// Backtracking Algorithm

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function permute(nums) {
  const result = [];
  const currentPath = [];
  const used = new Array(nums.length).fill(false);

  function backtrack() {
    // Base case: check if current path length matches input length
    if (currentPath.length === nums.length) {
      // FIX: Using currentPath.slice() safely instantiates a brand new
      // array reference that the platform serializer won't flatten/mangle.
      result.push(currentPath.slice());
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;

      // Choose
      currentPath.push(nums[i]);
      used[i] = true;

      // Recurse
      backtrack();

      // Undo Choose
      currentPath.pop();
      used[i] = false;
    }
  }

  backtrack();
  return result;
}

// How It Works

// 1. The Tracking Array (used): To ensure we don't pick the same number twice within a single permutation, we keep a boolean array used. It acts like a checklist.

// 2. The Deep Dive (Recursion): If we start with nums = [1, 2, 3]:

// - We pick 1. Our path is [1].
// - We look for the next unused number. We pick 2. Our path is [1, 2].
// - We look for the next unused number. We pick 3. Our path is [1, 2, 3].
// - The length matches nums.length, so [1, 2, 3] is saved to result.

// 3. The Pivot (Backtracking): The function finishes for 3 and steps backward to [1, 2]. It pops 3, turning used[2] back to false. It steps backward again to [1], pops 2, and now tries the next alternative for that slot, which is 3. This yields [1, 3, 2].
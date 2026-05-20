// You are given a 0-indexed array of integers nums of length n. You are initially positioned at index 0.

// Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at index i, you can jump to any index (i + j) where:

// 0 <= j <= nums[i] and
// i + j < n
// Return the minimum number of jumps to reach index n - 1. The test cases are generated such that you can reach index n - 1.

// Example 1:

// Input: nums = [2,3,1,1,4]
// Output: 2
// Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
// Example 2:

// Input: nums = [2,3,0,1,4]
// Output: 2

// Greedy Algorithm

// Location: src/utils/jump-game.ts

/**
 * Calculates the minimum number of jumps to reach the last index.
 * Time Complexity: O(n) - Single pass through the array.
 * Space Complexity: O(1) - Uses only constant extra space.
 */
function jump(nums) {
  // If the array has only 1 element, we are already at the destination
  if (nums.length <= 1) {
    return 0;
  }

  let jumps = 0;
  let currentEnd = 0;
  let farthest = 0;

  // We don't need to iterate through the last element because
  // once we reach or cross the second-to-last element,
  // we already know the minimum jumps required to touch the end.
  for (let i = 0; i < nums.length - 1; i++) {
    // Track the furthest index we can possibly reach from current position
    farthest = Math.max(farthest, i + nums[i]);

    // If we have reached the end of the range for the current jump
    if (i === currentEnd) {
      jumps++; // We must make another jump
      currentEnd = farthest; // Update the boundary of the next jump range

      // If our next boundary already reaches or exceeds the last index, break early
      if (currentEnd >= nums.length - 1) {
        break;
      }
    }
  }

  return jumps;
}

// How It Works
// Instead of checking every single possible jump combination (which would be too slow), the algorithm visualizes the process as jumping across ranges/levels:

// 1. farthest: As you walk through the array, you constantly note down the absolute furthest point you could reach if you decided to jump from any of the indices you've visited so far.

// 2. currentEnd: This marks the limit of your current jump. You don't actually decide where you jumped from; you just look at all your options within the current boundary.

// 3. Triggering a Jump: When your index i reaches currentEnd, it means you have exhausted all steps of your current jump. You are forced to lock in a new jump (jumps++), and your new boundary currentEnd becomes the farthest point you discovered during this window.

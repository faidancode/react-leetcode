// Given an integer array nums of length n and an integer target, find three integers at distinct indices in nums such that the sum is closest to target.

// Return the sum of the three integers.

// You may assume that each input would have exactly one solution.

// Example 1:

// Input: nums = [-1,2,1,-4], target = 1
// Output: 2
// Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  // 1. Sort the array to use the two-pointer technique
  nums.sort((a, b) => a - b);

  // Initialize closestSum with a value from the first possible triplet
  let closestSum = nums[0] + nums[1] + nums[2];

  // 2. Iterate through the array
  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const currentSum = nums[i] + nums[left] + nums[right];

      // If we find the exact target, return it immediately
      if (currentSum === target) {
        return currentSum;
      }

      // 3. Update closestSum if the current triplet is closer to target
      // Math.abs helps us compare the distance regardless of positive/negative
      if (Math.abs(currentSum - target) < Math.abs(closestSum - target)) {
        closestSum = currentSum;
      }

      // 4. Move pointers based on the comparison to target
      if (currentSum < target) {
        left++; // We need a larger sum
      } else {
        right--; // We need a smaller sum
      }
    }
  }

  return closestSum;
};


// The Logic
// Sort the Array: Sorting allows us to use two pointers to effectively "narrow down" the sum toward the target.

// Iterate: We loop through the array, treating the current element as the first of our three integers.

// Two Pointers: For every element at index i, we set a left pointer at i + 1 and a right pointer at the end of the array.

// If the current sum is less than the target, we move the left pointer forward to increase the sum.

// If the current sum is greater than the target, we move the right pointer backward to decrease the sum.

// If the sum equals the target, we return it immediately.
// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

// Notice that the solution set must not contain duplicate triplets.

// Example 1:

// Input: nums = [-1,0,1,2,-1,-4]
// Output: [[-1,-1,2],[-1,0,1]]
// Explanation:
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
// The distinct triplets are [-1,0,1] and [-1,-1,2].
// Notice that the order of the output and the order of the triplets does not matter.

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const results = [];

  // 1. Sort the array numerically
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    // 2. Skip duplicate values for the first element
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    // Optimization: If the smallest possible sum is > 0, no need to continue
    if (nums[i] > 0) break;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        results.push([nums[i], nums[left], nums[right]]);

        // 3. Skip duplicates for the second and third elements
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;

        // Move both pointers inward after finding a valid triplet
        left++;
        right--;
      } else if (sum < 0) {
        // Sum too small, move left pointer to increase sum
        left++;
      } else {
        // Sum too large, move right pointer to decrease sum
        right--;
      }
    }
  }

  return results;
};

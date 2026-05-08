// The Strategy

// 1. Sort the Array: This is crucial to handle duplicates easily and use the two-pointer approach.

// 2. Two Nested Loops:
// -- The outer loop (index i) picks the first number.
// -- The inner loop (index j) picks the second number.

// 3. Two Pointers: We place left at j + 1 and right at the end of the array to find the remaining two numbers that complete the sum.

// 4.Skip Duplicates: To ensure the quadruplets are unique, we skip over identical numbers in both the loops and the pointer movements.

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  const result = [];
  const n = nums.length;

  if (n < 4) return result;

  // 1. Sort the array numerically
  nums.sort((a, b) => a - b);

  // 2. First loop for the first number
  for (let i = 0; i < n - 3; i++) {
    // Skip duplicate values for the first number
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    // 3. Second loop for the second number
    for (let j = i + 1; j < n - 2; j++) {
      // Skip duplicate values for the second number
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;

      let left = j + 1;
      let right = n - 1;

      // 4. Two-pointer approach for the last two numbers
      while (left < right) {
        const sum = nums[i] + nums[j] + nums[left] + nums[right];

        if (sum === target) {
          result.push([nums[i], nums[j], nums[left], nums[right]]);

          // Skip duplicates for the third and fourth numbers
          while (left < right && nums[left] === nums[left + 1]) left++;
          while (left < right && nums[right] === nums[right - 1]) right--;

          left++;
          right--;
        } else if (sum < target) {
          left++; // Need a larger sum
        } else {
          right--; // Need a smaller sum
        }
      }
    }
  }

  return result;
};

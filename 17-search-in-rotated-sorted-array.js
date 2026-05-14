// There is an integer array nums sorted in ascending order (with distinct values).

// Prior to being passed to your function, nums is possibly left rotated at an unknown index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be left rotated by 3 indices and become [4,5,6,7,0,1,2].

// Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

// You must write an algorithm with O(log n) runtime complexity.

// Input: nums = [4,5,6,7,0,1,2], target = 0
// Output: 4

// Modified Binary Search Approach

/**
 * Searches for a target value in a rotated sorted array.
 * @param {number[]} nums - The rotated sorted array.
 * @param {number} target - The value to find.
 * @return {number} - The index of the target or -1 if not found.
 */
var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    // Calculate the middle index
    let mid = Math.floor((left + right) / 2);

    // If target is found, return the index
    if (nums[mid] === target) {
      return mid;
    }

    // Identify which half is sorted
    if (nums[left] <= nums[mid]) {
      // Left half [left...mid] is sorted
      if (target >= nums[left] && target < nums[mid]) {
        // Target is within the sorted left half
        right = mid - 1;
      } else {
        // Target must be in the right half
        left = mid + 1;
      }
    } else {
      // Right half [mid...right] is sorted
      if (target > nums[mid] && target <= nums[right]) {
        // Target is within the sorted right half
        left = mid + 1;
      } else {
        // Target must be in the left half
        right = mid - 1;
      }
    }
  }

  // Target not found
  return -1;
};


// Logic & Explanation
// The core idea is to perform a standard binary search but with an added check to see which side of the mid point is "linear" (sorted).

// 1. Initialize Pointers: We start with left at index 0 and right at the end of the array.

// 2. Calculate Mid: In every iteration, we find the middle element.

// 3. Check for Sorted Side:

// -- If nums[left] <= nums[mid], it means the sequence from left to mid is sorted (no rotation happened in this specific segment).
// -- Otherwise, the rotation must have happened in the left half, meaning the right half (mid to right) is guaranteed to be sorted.

// 4. Narrow the Search:

// -- Once we identify the sorted half, we check if the target lies within its range.
// -- If it does, we move our pointers to stay in that half.
// -- If it doesn't, we "jump" to the other (unsorted) half and repeat the process.
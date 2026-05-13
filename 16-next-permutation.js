// A permutation of an array of integers is an arrangement of its members into a sequence or linear order.

// For example, for arr = [1,2,3], the following are all the permutations of arr: [1,2,3], [1,3,2], [2, 1, 3], [2, 3, 1], [3,1,2], [3,2,1].
// The next permutation of an array of integers is the next lexicographically greater permutation of its integer. More formally, if all the permutations of the array are sorted in one container according to their lexicographical order, then the next permutation of that array is the permutation that follows it in the sorted container. If such arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).

// For example, the next permutation of arr = [1,2,3] is [1,3,2].

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
  let i = nums.length - 2;

  // Step 1: Find the first decreasing element from the right.
  // This element is the 'pivot'.
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i--;
  }

  if (i >= 0) {
    // Step 2: Find the element to the right of 'i' that is
    // just slightly larger than nums[i].
    let j = nums.length - 1;
    while (nums[j] <= nums[i]) {
      j--;
    }
    // Swap them
    swap(nums, i, j);
  }

  // Step 3: Reverse the sequence to the right of 'i'.
  // Since the original sequence was descending, reversing it
  // makes it ascending (the smallest possible order).
  reverse(nums, i + 1);
};

/**
 * Helper to swap two elements in the array
 */
function swap(nums, i, j) {
  let temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}

/**
 * Helper to reverse a portion of the array in-place
 */
function reverse(nums, start) {
  let end = nums.length - 1;
  while (start < end) {
    swap(nums, start, end);
    start++;
    end--;
  }
}


// Logic Explanation

// The goal is to find the next "lexicographical" order, which is similar to finding the next larger number using the same digits.

// 1. Identify the Pivot: We scan from right to left to find the first pair where $nums[i] < nums[i+1]$. This $i$ is our pivot. Everything to the right of $i$ is currently in descending order (the largest possible arrangement for those numbers).

// 2. Find the Successor: If a pivot is found, we need to replace $nums[i]$ with the smallest number to its right that is still larger than $nums[i]$. This minimizes the "increase" we are making to the array.

// 3. Minimize the Tail: After swapping, the numbers to the right of $i$ are still in descending order. To get the next permutation (the smallest one greater than the original), we must turn that descending tail into an ascending one. Reversing it is the fastest way to do this.

// 4. Edge Case: If no pivot is found (e.g., [3, 2, 1]), it means the entire array is in descending order. The code will skip the second step and simply reverse the whole array to return [1, 2, 3].
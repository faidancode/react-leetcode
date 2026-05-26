// Given an integer array nums, find the subarray with the largest sum, and return its sum.
//  
// Example 1:
// Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
// Output: 6
// Explanation: The subarray [4,-1,2,1] has the largest sum 6.

// Example 2:
// Input: nums = [1]
// Output: 1
// Explanation: The subarray [1] has the largest sum 1.

// Example 3:
// Input: nums = [5,4,-1,7,8]
// Output: 23
// Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.

// Kadane's Algorithm

function maxSubArray(nums) {
    // Handle edge case where array is empty
    if (nums.length === 0) return 0;

    // Initialize both tracking variables with the first element
    let currentSum = nums[0];
    let maxSum = nums[0];

    // Loop through the array starting from the second element
    for (let i = 1; i < nums.length; i++) {
        // Decide whether to add the current element to the existing subarray,
        // or start a new subarray from the current element.
        currentSum = Math.max(nums[i], currentSum + nums[i]);

        // Update the maximum sum found so far
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}

// Let's trace how the variables change using the array [-2, 1, -3, 4, -1, 2, 1, -5, 4]:

// Initialization: currentSum = -2, maxSum = -2

// i = 1 (Value = 1): currentSum becomes Math.max(1, -2 + 1) = 1. maxSum becomes Math.max(-2, 1) = 1. (We started a new subarray here because the previous sum pulled us down).

// i = 2 (Value = -3): currentSum becomes Math.max(-3, 1 + -3) = -2. maxSum stays 1.

// i = 3 (Value = 4): currentSum becomes Math.max(4, -2 + 4) = 4. maxSum becomes Math.max(1, 4) = 4. (Started a new subarray again).

// i = 4 (Value = -1): currentSum becomes Math.max(-1, 4 + -1) = 3. maxSum stays 4.

// i = 5 (Value = 2): currentSum becomes Math.max(2, 3 + 2) = 5. maxSum becomes 5.

// i = 6 (Value = 1): currentSum becomes Math.max(1, 5 + 1) = 6. maxSum becomes 6. (This is our peak!)

// i = 7 (Value = -5): currentSum drops to 1. maxSum stays 6.

// i = 8 (Value = 4): currentSum becomes 5. maxSum stays 6.
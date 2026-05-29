// You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.
// Return true if you can reach the last index, or false otherwise.
//  
// Example 1:
// Input: nums = [2,3,1,1,4]Output: trueExplanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
// Example 2:
// Input: nums = [3,2,1,0,4]Output: falseExplanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.

// Greedy Algorithm

function canJump(nums) {
    // Keeps track of the maximum index we can reach so far
    let maxReachable = 0;

    for (let i = 0; i < nums.length; i++) {
        // If the current index is greater than the maximum reachable index,
        // it means we can't even step onto this index.
        if (i > maxReachable) {
            return false;
        }

        // Update the maximum reachable index from the current position
        maxReachable = Math.max(maxReachable, i + nums[i]);

        // Optimization: If we can already reach or exceed the last index, 
        // we can return true early.
        if (maxReachable >= nums.length - 1) {
            return true;
        }
    }

    return true;
}

// Step-by-Step Explanation

// Example 1: [2, 3, 1, 1, 4] (Result: true)
// Start at i = 0 (Value = 2): maxReachable becomes Math.max(0, 0 + 2) = 2. Since 2 is not yet the last index (index 4), we continue.
// i = 1 (Value = 3): Is 1 > 2? No. maxReachable becomes Math.max(2, 1 + 3) = 4.
// Check optimization: Our maxReachable (4) is $\ge$ the last index (4). We immediately return true!

// Example 2: [3, 2, 1, 0, 4] (Result: false)
// - i = 0 (Value = 3): maxReachable becomes Math.max(0, 0 + 3) = 3.
// - i = 1 (Value = 2): maxReachable becomes Math.max(3, 1 + 2) = 3.
// - i = 2 (Value = 1): maxReachable becomes Math.max(3, 2 + 1) = 3.
// - i = 3 (Value = 0): maxReachable becomes Math.max(3, 3 + 0) = 3.
// - i = 4 (Value = 4): Loop checks if i > maxReachable $\rightarrow$ 4 > 3. This is true! We cannot reach this index because we got stuck at the 0 on index 3. The function returns false.
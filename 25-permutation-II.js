// Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.

// Example 1:
// Input: nums = [1,1,2]
// Output:
// [[1,1,2],
// [1,2,1],
// [2,1,1]]

// Example 2:

// Input: nums = [1,2,3]
// Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]] 

// Backtracking Algorithm
// DFS and Pruning


/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function permuteUnique(nums) {
    const result = [];
    
    // 1. Sort the numbers to bring duplicates next to each other
    nums.sort((a, b) => a - b);
    
    // Track whether the item at index i is currently used in the path
    const used = new Array(nums.length).fill(false);
    
    function backtrack(currentPath) {
        // Base case: if the path length matches nums length, we found a unique permutation
        if (currentPath.length === nums.length) {
            result.push(currentPath);
            return;
        }
        
        for (let i = 0; i < nums.length; i++) {
            // Skip if this specific element is already used in the current path
            if (used[i]) continue;
            
            // CRITICAL DUPLICATE SKIP CONDITION:
            // If this number is the same as the previous one, we must look at the previous one.
            // If used[i - 1] is false, it means the previous identical number was already 
            // used and popped in a previous sibling branch. Creating a new branch with this
            // identical number would generate a mirror duplicate tree. So we skip it.
            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
                continue;
            }
            
            // Mark as used
            used[i] = true;
            
            // Pass a new array copy down to keep paths completely isolated
            backtrack([...currentPath, nums[i]]);
            
            // Backtrack: unmark for sibling choices
            used[i] = false;
        }
    }
    
    backtrack([]);
    return result;
}

// Why the Pruning Condition Works
// Let's trace nums = [1, 1, 2] after sorting:

// 1. First Element nums[0] = 1:
// It's used. Path becomes [1].
// Next level picks nums[1] = 1. Path becomes [1, 1].
// Next level picks nums[2] = 2. Path becomes [1, 1, 2] -> Saved.

// 2.Backtracking clears the path back to []:
// Now the loop reaches i = 1, which is nums[1] = 1.
// The condition checks: nums[1] === nums[0] (True, both are 1) AND !used[0] (True, nums[0] was cleared back to false).
// This triggers the continue. The entire branch starting with the second 1 is skipped because the first 1 already explored every single configuration that a leading 1 could possibly offer.

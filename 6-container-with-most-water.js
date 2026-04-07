/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let maxWater = 0;
  let left = 0;
  let right = height.length - 1;

  while (left < right) {
    // Calculate the width between the two pointers
    let width = right - left;

    // The height of the water is limited by the shorter vertical line
    let currentHeight = Math.min(height[left], height[right]);

    // Calculate current area and update maxWater if current is larger
    let currentArea = width * currentHeight;
    maxWater = Math.max(maxWater, currentArea);

    // Move the pointer that points to the shorter line inward
    // This is because keeping the shorter line can never produce
    // a larger area with a smaller width.
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxWater;
};

// Example 1:
// Input: [1, 8, 6, 2, 5, 4, 8, 3, 7]
// Output: 49

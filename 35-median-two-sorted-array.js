// Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.
// The overall run time complexity should be O(log (m+n)).
//
// Example 1:
// Input: nums1 = [1,3], nums2 = [2]Output: 2.00000Explanation: merged array = [1,2,3] and median is 2.
// Example 2:
// Input: nums1 = [1,2], nums2 = [3,4]Output: 2.50000Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

// Binary Search Partitioning

function findMedianSortedArrays(nums1, nums2) {
  // Ensure nums1 is the smaller array to optimize binary search complexity to O(log(min(m, n)))
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1);
  }

  const m = nums1.length;
  const n = nums2.length;

  let low = 0;
  let high = m;

  while (low <= high) {
    // Partition formula
    const partition1 = Math.floor((low + high) / 2);
    const partition2 = Math.floor((m + n + 1) / 2) - partition1;

    // Edge case handling: if partition is at the boundaries, use -Infinity or Infinity
    const maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1];
    const minRight1 = partition1 === m ? Infinity : nums1[partition1];

    const maxLeft2 = partition2 === 0 ? -Infinity : nums2[partition2 - 1];
    const minRight2 = partition2 === n ? Infinity : nums2[partition2];

    // Check if we found the correct partition
    if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
      // If the total number of elements is odd
      if ((m + n) % 2 !== 0) {
        return Math.max(maxLeft1, maxLeft2);
      }
      // If the total number of elements is even
      else {
        return (
          (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2
        );
      }
    }
    // If maxLeft1 is greater than minRight2, we are too far right in nums1. Move left.
    else if (maxLeft1 > minRight2) {
      high = partition1 - 1;
    }
    // If maxLeft2 is greater than minRight1, we are too far left in nums1. Move right.
    else {
      low = partition1 + 1;
    }
  }

  return 0.0;
}


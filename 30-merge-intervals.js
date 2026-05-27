// Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

// Example 1:

// Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
// Output: [[1,6],[8,10],[15,18]]
// Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
// Example 2:

// Input: intervals = [[1,4],[4,5]]
// Output: [[1,5]]
// Explanation: Intervals [1,4] and [4,5] are considered overlapping.
// Example 3:

// Input: intervals = [[4,7],[1,4]]
// Output: [[1,7]]
// Explanation: Intervals [1,4] and [4,7] are considered overlapping.

// Sorting and Greedy Approach

function merge(intervals) {
    // If there's 0 or 1 interval, no merging is needed
    if (intervals.length <= 1) return intervals;

    // Step 1: Sort the intervals by their start times
    intervals.sort((a, b) => a[0] - b[0]);

    // Initialize the result array with the first interval
    const merged = [intervals[0]];

    // Step 2: Iterate through the sorted intervals
    for (let i = 1; i < intervals.length; i++) {
        const currentInterval = intervals[i];
        // Get the last interval we added to our merged result
        const lastMergedInterval = merged[merged.length - 1];

        // Check for overlap: 
        // If the current interval's start time is less than or equal 
        // to the last merged interval's end time, they overlap!
        if (currentInterval[0] <= lastMergedInterval[1]) {
            // Merge them by updating the end time of the last merged interval
            lastMergedInterval[1] = Math.max(lastMergedInterval[1], currentInterval[1]);
        } else {
            // No overlap, so we just push the current interval as a new entry
            merged.push(currentInterval);
        }
    }

    return merged;
}

// Step-by-Step Walkthrough

// Let's look at Example 1: [[1, 3], [2, 6], [8, 10], [15, 18]]
// 1. Sorting: The input is already sorted by start times: [1,3], [2,6], [8,10], [15,18].
// 2. Initialization: merged = [[1, 3]]
// 3. Loop i = 1 ([2, 6]): * Does it overlap with [1, 3]? Yes, because its start (2) is $\le$ the previous end (3).We merge them by changing the end of the previous interval to Math.max(3, 6) = 6.merged becomes [[1, 6]].
// 4. Loop i = 2 ([8, 10]): * Does it overlap with [1, 6]? No, because its start (8) is greater than the previous end (6).We just push it to the list.merged becomes [[1, 6], [8, 10]].
// 5. Loop i = 3 ([15, 18]): * Does it overlap with [8, 10]? No, because 15 > 10.We push it to the list.merged becomes [[1, 6], [8, 10], [15, 18]].
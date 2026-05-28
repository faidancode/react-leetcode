// You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.
// Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).
// Return intervals after the insertion.
// Note that you don't need to modify intervals in-place. You can make a new array and return it.
//  
// Example 1:
// Input: intervals = [[1,3],[6,9]], 
// newInterval = [2,5]
// Output: [[1,5],[6,9]]

// Example 2:
// Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
// Output: [[1,2],[3,10],[12,16]]
// Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

// Linear Scan with a Greedy Algorithm

function insert(intervals, newInterval) {
    const result = [];
    let i = 0;
    const n = intervals.length;

    // Phase 1: Add all intervals that come strictly BEFORE the newInterval
    // (Their end time is less than the newInterval's start time)
    while (i < n && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i]);
        i++;
    }

    // Phase 2: Merge all overlapping intervals with the newInterval
    // (As long as the current interval starts before or when the newInterval ends)
    while (i < n && intervals[i][0] <= newInterval[1]) {
        // The new start is the minimum of both starts
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        // The new end is the maximum of both ends
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    
    // Push the final merged newInterval into the result
    result.push(newInterval);

    // Phase 3: Add all remaining intervals that come strictly AFTER the newInterval
    while (i < n) {
        result.push(intervals[i]);
        i++;
    }

    return result;
}

// Phase 1 (Before Overlap): 
// * We check [1, 2]. Since its end (2) is less than our new start (4), it does not overlap.
// - result = [[1, 2]].

// Phase 2 (Merging Overlaps):
// - We check [3, 5]. Its start (3) is $\le$ our new end (8). They overlap!newInterval becomes [Math.min(4,3), Math.max(8,5)] $\rightarrow$ [3, 8].
// - We check [6, 7]. Its start (6) is $\le$ our current new end (8). Overlap!newInterval becomes [Math.min(3,6), Math.max(8,7)] $\rightarrow$ [3, 8].
// - We check [8, 10]. Its start (8) is $\le$ our current new end (8). Overlap!newInterval becomes [Math.min(3,8), Math.max(8,10)] $\rightarrow$ [3, 10].
// - We check [12, 16]. Its start (12) is greater than our new end (10). The loop stops.We push the fully merged [3, 10] into the result.
// - result = [[1, 2], [3, 10]].

// Phase 3 (After Overlap):
// - We simply copy over any remaining intervals. [12, 16] is added.
// - result = [[1, 2], [3, 10], [12, 16]].
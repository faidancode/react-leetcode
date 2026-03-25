// Given a string s, find the length of the longest substring without duplicate characters.

// Example 1:
// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let maxLength = 0;
    let left = 0;
    const charMap = new Map();

    for (let right = 0; right < s.length; right++) {
        const currentChar = s[right];

        // If the character is already in the map and within the current window
        if (charMap.has(currentChar) && charMap.get(currentChar) >= left) {
            // Move left pointer to skip the repeated character
            left = charMap.get(currentChar) + 1;
        }

        // Update/Set the character's last seen index
        charMap.set(currentChar, right);

        // Update the maximum length found so far
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
};

// To solve the Longest Substring Without Repeating Characters problem efficiently, we use the Sliding Window technique. This approach allows us to find the result in a single pass through the string.

// The Logic

// Instead of checking every possible substring, we maintain a "window" defined by two pointers: left and right.
// *Move the right pointer to expand the window.
// *Store characters and their most recent indices in a Map.
// *If we encounter a character that is already in the Map and its index is within our current window, we "shrink" the window by moving the left pointer to the position right after the last occurrence of that character.
// *At each step, calculate the window size ($right - left + 1$) and update our maximum length.
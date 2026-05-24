// Given an array of strings strs, group the anagrams together. You can return the answer in any order.

// Example 1:

// Input: strs = ["eat","tea","tan","ate","nat","bat"]

// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

// Frequency Counting (For Large Strings)

function groupAnagramsByCount(strs) {
    const map = {};

    for (const word of strs) {
        // Initialize a frequency array for 26 lowercase English letters
        const count = new Array(26).fill(0);
        
        for (let i = 0; i < word.length; i++) {
            // Find alphabetical index (e.g., 'a' -> 0, 'b' -> 1) using charCodeAt
            // ASCII decimal value of 'a' is 97, so we subtract to get a zero-based index
            const index = word.charCodeAt(i) - 'a'.charCodeAt(0);
            count[index]++;
        }
        
        // Convert the array into a flat string string identifier (e.g. "1,0,1,0...")
        const key = count.join(',');
        
        if (!map[key]) map[key] = [];
        map[key].push(word);
    }

    return Object.values(map);
}
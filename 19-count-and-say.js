// The count-and-say sequence is a sequence of digit strings defined by the recursive formula:

// countAndSay(1) = "1"
// countAndSay(n) is the run-length encoding of countAndSay(n - 1).
// Run-length encoding (RLE) is a string compression method that works by replacing consecutive identical characters (repeated 2 or more times) with the concatenation of the character and the number marking the count of the characters (length of the run). For example, to compress the string "3322251" we replace "33" with "23", replace "222" with "32", replace "5" with "15" and replace "1" with "11". Thus the compressed string becomes "23321511".

// Iterative Approach

/**
 * Function to get the n-th element of the Count-and-Say sequence.
 * @param {number} n - The position of the sequence (positive integer).
 * @return {string}
 */
function countAndSay(n) {
    // Base case: if n is 1, directly return "1"
    if (n === 1) return "1";

    // Initialize the first sequence
    let currentString = "1";

    // Loop to build the sequence from 2 up to n
    for (let i = 2; i <= n; i++) {
        let nextString = "";
        let count = 1;

        // Iterate through the current string to perform Run-Length Encoding (RLE)
        for (let j = 0; j < currentString.length; j++) {
            // If the next character is the same as the current one, increment the count
            if (currentString[j] === currentString[j + 1]) {
                count++;
            } else {
                // If it's different (or we reached the end), append [count] + [character]
                nextString += count + currentString[j];
                // Reset the count for the next new character
                count = 1;
            }
        }

        // Update currentString with the newly generated RLE string
        currentString = nextString;
    }

    return currentString;
}

// --- Test Cases ---
console.log(countAndSay(1)); // Output: "1"
console.log(countAndSay(4)); // Output: "1211"
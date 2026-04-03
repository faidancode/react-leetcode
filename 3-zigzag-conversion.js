// The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

// P   A   H   N
// A P L S I I G
// Y   I   R
// And then read line by line: "PAHNAPLSIIGYIR"

// Write the code that will take a string and make this conversion given a number of rows:

// string convert(string s, int numRows);

// Example 1:

// Input: s = "PAYPALISHIRING", numRows = 3
// Output: "PAHNAPLSIIGYIR"

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  // If numRows is 1 or the string is shorter than the rows, no conversion needed
  if (numRows === 1 || s.length <= numRows) {
    return s;
  }

  // Initialize an array of strings for each row
  const rows = new Array(Math.min(numRows, s.length)).fill("");
  let currentRow = 0;
  let goingDown = false;

  // Iterate through each character in the input string
  for (const char of s) {
    rows[currentRow] += char;

    // If we are at the top or bottom row, reverse the direction
    if (currentRow === 0 || currentRow === numRows - 1) {
      goingDown = !goingDown;
    }

    // Move to the next row based on direction
    currentRow += goingDown ? 1 : -1;
  }

  // Join all row strings together
  return rows.join("");
};

// Example Usage:
// console.log(convert("PAYPALISHIRING", 3)); // Output: "PAHNAPLSIIGYIR"

// Logic Explanation
// The core idea is to imagine several "buckets" (one for each row). We move through the string and place each character into the correct bucket, changing direction whenever we hit the top row or the bottom row.

// 1. Edge Case: If numRows is 1 or greater than the string length, the zigzag doesn't change anything, so we return the original string.

// 2. Tracking Rows: We create an array of strings (or arrays) to represent each row.

// 3. The Direction Switch: * We start at currentRow = 0.

// -- We move "down" (incrementing the row index) until we reach numRows - 1.

// -- We then move "up" (decrementing the row index) until we reach 0.

// 4. Final Result: Once all characters are placed, we join all the rows together into one final string.

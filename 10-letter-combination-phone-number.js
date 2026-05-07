/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  // If no digits are provided, return an empty array
  if (!digits.length) return [];

  // Map of phone digits to letters
  const phoneMap = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  const result = [];

  /**
   * Helper function to explore combinations
   * @param {number} index - Current digit index we are processing
   * @param {string} currentString - The string built so far
   */
  function backtrack(index, currentString) {
    // Base case: if current string length matches digits length, we are done
    if (currentString.length === digits.length) {
      result.push(currentString);
      return;
    }

    // Get letters corresponding to the current digit
    const letters = phoneMap[digits[index]];

    // Iterate through each letter and recurse
    for (const letter of letters) {
      backtrack(index + 1, currentString + letter);
    }
  }

  // Start the backtracking process from the first digit
  backtrack(0, "");

  return result;
};  

// Explanation
// Think of this like a tree where "23" is the input.

// We start with '2' which gives us a, b, c.
// From 'a', we look at '3' which gives us d, e, f. This creates ad, ae, and af.
// We then go back (backtrack) and do the same for 'b' (bd, be, bf) and 'c' (cd, ce, cf).
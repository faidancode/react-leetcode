// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

// Example 1:
// Input: n = 3
// Output: ["((()))","(()())","(())()","()(())","()()()"]

// Example 2:
// Input: n = 1
// Output: ["()"]


/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const result = [];

  /**
   * Helper function to build the combinations
   * @param {string} currentString - The string built so far
   * @param {number} openCount - Number of '(' used
   * @param {number} closeCount - Number of ')' used
   */
  const backtrack = (currentString, openCount, closeCount) => {
    // Base Case: If the string reaches the maximum length (2 * n), it's complete
    if (currentString.length === n * 2) {
      result.push(currentString);
      return;
    }

    // Rule 1: We can always add an opening bracket if we haven't used all 'n'
    if (openCount < n) {
      backtrack(currentString + "(", openCount + 1, closeCount);
    }

    // Rule 2: We can only add a closing bracket if there are more
    // opening brackets currently in the string than closing ones.
    if (closeCount < openCount) {
      backtrack(currentString + ")", openCount, closeCount + 1);
    }
  };

  // Start the recursion with an empty string and zero counts
  backtrack("", 0, 0);

  return result;
};


// Logic Explanation

// The core idea is to maintain the validity of the string at every single step of the recursion rather than generating all permutations and checking them later.
// 1. The State: We track three things: the currentString, the number of open brackets used, and the number of closed brackets used.
// 2. The Constraints:
// - Max Open: We can never have more than $n$ opening brackets.
// - Balance: We can never add a closing bracket unless there is a matching opening bracket already available. This is represented by closeCount < openCount.
// 3. The Recursion Tree:
// - At each step, the algorithm tries to add ( and then explores that path.
// - It then "backtracks" and tries to add ) if the balance rule allows it.
// 4.Completion: Once the string length reaches $2n$, we know we have a valid, well-formed combination, so we add it to our results array.
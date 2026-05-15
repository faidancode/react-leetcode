/**
 * Validates a 9x9 Sudoku board.
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
  // Sets to store seen numbers for rows, columns, and boxes
  const rows = Array.from({ length: 9 }, () => new Set());
  const cols = Array.from({ length: 9 }, () => new Set());
  const boxes = Array.from({ length: 9 }, () => new Set());

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = board[r][c];

      // Skip empty cells
      if (val === ".") continue;

      // Determine the index of the 3x3 sub-box
      // Using Math.floor(r / 3) * 3 + Math.floor(c / 3)
      // maps coordinates to a box index from 0 to 8
      const boxIdx = Math.floor(r / 3) * 3 + Math.floor(c / 3);

      // Check if the value already exists in the current row, column, or box
      if (rows[r].has(val) || cols[c].has(val) || boxes[boxIdx].has(val)) {
        return false;
      }

      // Add the value to the respective sets
      rows[r].add(val);
      cols[c].add(val);
      boxes[boxIdx].add(val);
    }
  }

  return true;
};


// Logic & Explanation
// The algorithm iterates through every cell in the $9 \times 9$ grid exactly once, resulting in a time complexity of $O(1)$ (since the board size is fixed at 81 cells).

// 1. Row & Column Validation: Tracking rows and columns is straightforward—we use the current row index r and column index c to access the corresponding Set.
// 2. Sub-box Validation: The trickiest part is mapping the coordinates $(r, c)$ to one of the nine $3 \times 3$ boxes. By using the formula:

// $$boxIdx = \lfloor r / 3 \rfloor \times 3 + \lfloor c / 3 \rfloor$$

// we treat the grid as a $3 \times 3$ block of boxes. For example, any cell from row 0-2 and column 0-2 will result in boxIdx 0.
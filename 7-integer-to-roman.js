/**
 * Converts an integer to a Roman numeral string.
 * @param {number} num - The integer to convert (1 - 3999).
 * @returns {string} - The resulting Roman numeral.
 */
function intToRoman(num) {
  // Define a lookup table of Roman symbols and their decimal values.
  // We include the subtractive forms (4, 9, 40, etc.) as distinct entries
  // to simplify the logic into a single descending loop.
  const valMap = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" },
  ];

  let result = "";

  // Iterate through the map from largest value to smallest
  for (const item of valMap) {
    // While the current number is greater than or equal to the decimal value...
    while (num >= item.value) {
      // Append the Roman symbol to our result string
      result += item.symbol;
      // Subtract the value from our total
      num -= item.value;
    }
  }

  return result;
}

// Example Usage:
console.log(intToRoman(3749)); // Output: "MMMDCCXLIX"
console.log(intToRoman(58)); // Output: "LVIII"
console.log(intToRoman(1994)); // Output: "MCMXCIV"

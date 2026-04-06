/**
 * @param {string} s
 * @return {number}
 */
const myAtoi = function (s) {
  // Define the 32-bit signed integer limits
  const INT_MAX = 2147483647; // 2^31 - 1
  const INT_MIN = -2147483648; // -2^31

  let i = 0;
  let sign = 1;
  let result = 0;

  // 1. Skip leading whitespaces
  while (i < s.length && s[i] === " ") {
    i++;
  }

  // 2. Check for signedness
  if (i < s.length && (s[i] === "+" || s[i] === "-")) {
    sign = s[i] === "-" ? -1 : 1;
    i++;
  }

  // 3. Conversion and Rounding
  while (i < s.length && s[i] >= "0" && s[i] <= "9") {
    const digit = s[i] - "0";

    // Check for overflow before updating result
    // We check if result > MAX/10, or if result == MAX/10 and the next digit > 7
    if (
      result > Math.floor(INT_MAX / 10) ||
      (result === Math.floor(INT_MAX / 10) && digit > 7)
    ) {
      return sign === 1 ? INT_MAX : INT_MIN;
    }

    result = result * 10 + digit;
    i++;
  }

  return result * sign;
};

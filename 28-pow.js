// Implement pow(x, n), which calculates x raised to the power n (i.e., xn).
// Example 1:
// Input: x = 2.00000, n = 10Output: 1024.00000
// Example 2:
// Input: x = 2.10000, n = 3Output: 9.26100
// Example 3:
// Input: x = 2.00000, n = -2Output: 0.25000Explanation: 2-2 = 1/22 = 1/4 = 0.25

// Binary Exponentiation (Exponentiation by Squaring)

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
function myPow(x, n) {
  // Handle the base case where exponent is 0
  if (n === 0) return 1;

  // If n is negative, invert x and make n positive
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }

  let result = 1;
  let currentProduct = x;

  // Loop until our exponent matches down to 0
  while (n > 0) {
    // If n is odd, multiply the current step's product into our result
    if (n % 2 === 1) {
      result *= currentProduct;
    }

    // Square the base for the next step
    currentProduct *= currentProduct;

    // Divide the exponent by 2 (discarding remainder via Math.floor)
    n = Math.floor(n / 2);
  }

  return result;
}

// --- Example Usage ---
console.log(myPow(2.0, 10)); // Output: 1024
console.log(myPow(2.1, 3)); // Output: 9.261
console.log(myPow(2.0, -2)); // Output: 0.25

// The Core Logic

// The algorithm relies on these mathematical properties:

// If $n$ is even: $x^n = (x^2)^{n/2}$
// If $n$ is odd: $x^n = x \cdot (x^2)^{(n-1)/2}$
// If $n$ is negative: $x^n = (\frac{1}{x})^{-n}$

// By squaring the base ($x$) whenever $n$ is halved, we drastically skip redundant multiplications. For example, instead of doing $2 \times 2 \times 2 \times 2 \times 2 \times 2 \times 2 \times 2$ (7 multiplications), we can compute $((2^2)^2)^2$ (3 multiplications).

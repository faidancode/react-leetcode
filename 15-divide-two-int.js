// Given two integers dividend and divisor, divide two integers without using multiplication, division, and mod operator.
// The integer division should truncate toward zero, which means losing its fractional part. For example, 8.345 would be truncated to 8, and -2.7335 would be truncated to -2.
// Return the quotient after dividing dividend by divisor.

// Note: Assume we are dealing with an environment that could only store integers within the 32-bit signed integer range: [−231, 231 − 1]. For this problem, if the quotient is strictly greater than 231 - 1, then return 231 - 1, and if the quotient is strictly less than -231, then return -231.

// Input: dividend = 10, divisor = 3
// Output: 3
// Explanation: 10/3 = 3.33333.. which is truncated to 3.

/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function(dividend, divisor) {
    // Define the 32-bit signed integer limits
    const MAX_INT = 2147483647; // 2^31 - 1
    const MIN_INT = -2147483648; // -2^31

    // Handle overflow edge case
    if (dividend === MIN_INT && divisor === -1) {
        return MAX_INT;
    }

    // Determine the sign of the result
    // If one is negative, the result is negative
    const isNegative = (dividend < 0) !== (divisor < 0);

    // Use absolute values for calculation
    // Note: Math.abs(MIN_INT) in JS results in 2147483648, 
    // which is safe because JS numbers are 64-bit floats internally.
    let absDividend = Math.abs(dividend);
    let absDivisor = Math.abs(divisor);
    let quotient = 0;

    // While the remaining dividend is larger than or equal to divisor
    while (absDividend >= absDivisor) {
        let tempDivisor = absDivisor;
        let multiple = 1;

        // Double the divisor using left shift (<< 1) 
        // to find the largest chunk we can subtract.
        // We check if (tempDivisor << 1) is still less than absDividend.
        // To prevent infinity/large number issues in JS, we use addition.
        while (absDividend >= (tempDivisor + tempDivisor)) {
            tempDivisor += tempDivisor;
            multiple += multiple;
        }

        // Subtract the largest found chunk from dividend
        absDividend -= tempDivisor;
        // Add the count of divisors found in that chunk to quotient
        quotient += multiple;
    }

    // Apply the sign and respect 32-bit boundaries
    let result = isNegative ? -quotient : quotient;
    
    return result > MAX_INT ? MAX_INT : (result < MIN_INT ? MIN_INT : result);
};

// Logic Explanation

// 1. Handling Signs: We determine if the final result should be negative by checking if the signs of the dividend and divisor differ. We then convert both to positive numbers to simplify the subtraction logic.

// 2. Bit Shifting Logic (Exponential Search):
// - Simple subtraction ($10 - 3 - 3 - 3$) is too slow for large numbers.
// - Instead, we try to subtract $divisor \times 2^0$, then $divisor \times 2^1$, $divisor \times 2^2$, etc.
// - In the code, tempDivisor += tempDivisor is equivalent to a left shift (<< 1), which doubles the value.
// - Once the doubled value exceeds the remaining dividend, we subtract the last valid "doubled" value and repeat the process for the remainder.

// 3. 32-bit Constraints:
// - The problem specifies a 32-bit environment. The most common overflow occurs when dividing $-2^{31}$ by $-1$, which results in $2^{31}$ (exceeding the positive limit of $2^{31}-1$). We handle this case explicitly at the start.
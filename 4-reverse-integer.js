/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    const INT_MAX = 2147483647;  // 2^31 - 1
    const INT_MIN = -2147483648; // -2^31
    
    let rev = 0;
    
    while (x !== 0) {
        // Get the last digit (handles negative numbers correctly in JS)
        let pop = x % 10;
        
        // Truncate x (move to the next digit)
        // We use Math.trunc to handle negative numbers correctly 
        // (Math.floor would turn -1.2 into -2)
        x = Math.trunc(x / 10);
        
        // Overflow Check:
        // 1. If rev > INT_MAX / 10, the next step (rev * 10) will surely overflow.
        // 2. If rev == INT_MAX / 10, we check if the digit (pop) is > 7.
        if (rev > Math.trunc(INT_MAX / 10) || (rev === Math.trunc(INT_MAX / 10) && pop > 7)) {
            return 0;
        }
        
        // Underflow Check:
        // 1. If rev < INT_MIN / 10, the next step will surely underflow.
        // 2. If rev == INT_MIN / 10, we check if the digit (pop) is < -8.
        if (rev < Math.trunc(INT_MIN / 10) || (rev === Math.trunc(INT_MIN / 10) && pop < -8)) {
            return 0;
        }
        
        rev = rev * 10 + pop;
    }
    
    return rev;
};

// The Logic
// 1. Extract the last digit: Use the modulo operator %.
// 2. Check for Overflow: Before updating the result, check if multiplying the current result by 10 will exceed 2147483647 or if it's equal to it but the next digit is greater than 7.
// 3. Check for Underflow: Similarly, check if it will drop below -2147483648.
// 4. Update: Add the digit to the result and truncate the original number.
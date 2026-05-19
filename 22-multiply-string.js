// Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string.

// Note: You must not use any built-in BigInteger library or convert the inputs to integer directly.

// Example 1:
// Input:
// num1 = "2",
// num2 = "3"
// Output: "6"

// Example 2:
// Input:
// num1 = "123",
// num2 = "456"
// Output: "56088"

function multiply(num1, num2) {
  // If either number is "0", the product is always "0"
  if (num1 === "0" || num2 === "0") {
    return "0";
  }

  const len1 = num1.length;
  const len2 = num2.length;

  // The maximum possible length of the result is len1 + len2
  // Initialize an array with zeros to store the intermediate results
  const result = new Array(len1 + len2).fill(0);

  // Loop through both strings from right to left (least significant to most significant)
  for (let i = len1 - 1; i >= 0; i--) {
    for (let j = len2 - 1; j >= 0; j--) {
      // Multiply the single digits
      const mul = (num1[i] - "0") * (num2[j] - "0");

      // Determine the positions in the result array
      const p1 = i + j; // Position for the carry over
      const p2 = i + j + 1; // Position for the current digit

      // Add the product to the existing value at the current position
      const sum = mul + result[p2];

      // Update the current position with the remainder
      result[p2] = sum % 10;

      // Add the carry over to the preceding position
      result[p1] += Math.floor(sum / 10);
    }
  }

  // Remove any leading zeros that might remain at the beginning of the array
  if (result[0] === 0) {
    result.shift();
  }

  // Convert the array back into a string
  return result.join("");
}

// How It Works

// 1. Edge Case Handling: If either num1 or num2 is "0", we immediately return "0".
// 2. Array Allocation: The maximum number of digits resulting from the multiplication of two numbers with lengths $M$ and $N$ is $M + N$. We create an array result of this size filled with 0s.
// 3. Double Loop (Right to Left): We multiply each digit of num1 by each digit of num2 starting from the back.(num1[i] - '0') converts the character digit into an actual JavaScript number without using parseInt().
// 4. Index Mapping: For indices i and j, their product affects the positions i + j (for the carry) and i + j + 1 (for the single digit) in our result array.
// 5. Managing Carries: We calculate the sum of the current multiplication and the value already stored at result[p2].sum % 10 gives us the digit to keep at p2.Math.floor(sum / 10) gives us the carry to add to result[p1].
// 6. Cleanup: Finally, if the very first element of the array is 0 (e.g., $2 \times 3 = 06$), we remove it using .shift() before merging the digits back into a single string.
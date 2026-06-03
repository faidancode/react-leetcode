// Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:
// '.' Matches any single character.​​​​
// '*' Matches zero or more of the preceding element.
// Return a boolean indicating whether the matching covers the entire input string (not partial).
//  
// Example 1:
// Input: s = "aa", p = "a"Output: falseExplanation: "a" does not match the entire string "aa".
// Example 2:
// Input: s = "aa", p = "a*"Output: trueExplanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
// Example 3:
// Input: s = "ab", p = ".*"Output: trueExplanation: ".*" means "zero or more (*) of any character (.)".

// Dynamic Programming

function isMatch(s, p) {
    const sLen = s.length;
    const pLen = p.length;

    // Create a 2D DP array initialized to false
    // dp[i][j] will be true if s[0...i-1] matches p[0...j-1]
    const dp = Array.from({ length: sLen + 1 }, () => Array(pLen + 1).fill(false));

    // Base case: An empty string matches an empty pattern
    dp[0][0] = true;

    // Base case: Handle patterns like a*, a*b*, or .* which can match an empty string s
    for (let j = 1; j <= pLen; j++) {
        if (p[j - 1] === '*') {
            // '*' can eliminate the preceding character, so it inherits the value from 2 columns back
            dp[0][j] = dp[0][j - 2];
        }
    }

    // Fill the DP table
    for (let i = 1; i <= sLen; i++) {
        for (let j = 1; j <= pLen; j++) {
            
            // Case 1: The current characters match, or the pattern has a '.'
            if (p[j - 1] === s[i - 1] || p[j - 1] === '.') {
                dp[i][j] = dp[i - 1][j - 1];
            } 
            
            // Case 2: The pattern has a '*'
            else if (p[j - 1] === '*') {
                // Subcase A: Count the '*' and its preceding character as 0 occurrences (skip it)
                dp[i][j] = dp[i][j - 2];

                // Subcase B: If the preceding character in p matches the current character in s
                if (p[j - 2] === s[i - 1] || p[j - 2] === '.') {
                    // It's a match if skipping it worked (Subcase A) OR if we look at the previous character of s
                    dp[i][j] = dp[i][j] || dp[i - 1][j];
                }
            }
        }
    }

    // The bottom-right cell contains the answer for the entire string and pattern
    return dp[sLen][pLen];
}

// Core Logic Breakdown

// The transitions inside the nested loops depend entirely on the character in pattern p:

// 1. If p[j-1] is a normal character or .:We simply check if it matches s[i-1]. If it does, the status of the current cell is exactly whatever the status was before these two characters were looked at ($dp[i][j] = dp[i-1][j-1]$).

// 2. If p[j-1] is *:This is the tricky part because * can mean zero or multiple instances of the letter before it (p[j-2]).
// -- Zero occurrences: We look two steps back in the pattern ($dp[i][j-2]$). We completely act like the * and its preceding character don't exist.
// -- Multiple occurrences: If the character before * matches the current character in s (i.e., p[j-2] === s[i-1] or p[j-2] === '.'), we check $dp[i-1][j]$. This means we "consume" one matching character from string s but keep the * pattern active for the next round.
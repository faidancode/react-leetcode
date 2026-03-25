// Given a string s, return the longest palindromic substring in s.

// Example 1:
// Input: s = "babad"
// Output: "bab"
// Explanation: "aba" is also a valid answer.

// Pattern : Expand Around Center

/**
 * @param {string} 
 * @return {string}
 */
var longestPalindrome = function(s) {
    if (s.length < 2) return s;
    
    let start = 0;
    let maxLength = 0;

    const expand = (left, right) => {
        // Terus melebar selama karakter di kiri dan kanan sama (simetris)
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            const currentPalLength = right - left + 1;
            
            // Jika menemukan yang lebih panjang, simpan titik start-nya
            if (currentPalLength > maxLength) {
                maxLength = currentPalLength;
                start = left;
            }
            
            left--;
            right++;
        }
    };

    for (let i = 0; i < s.length; i++) {
        expand(i, i);      // Cek palindrom ganjil (pusat di satu huruf)
        expand(i, i + 1);  // Cek palindrom genap (pusat di dua huruf berdampingan)
    }

    return s.substring(start, start + maxLength);
};

// Logika "Expand Around Center"

// Sebuah palindrom bercermin di titik tengahnya. Karena itu, kita bisa menganggap setiap karakter (atau celah antar karakter) sebagai potensi "pusat" palindrom, lalu kita kembangkan ke arah luar (left-- dan right++) selama karakternya masih sama.
// Ada dua jenis pusat yang harus kita cek:
// - Ganjil (Odd): Pusatnya adalah satu karakter (seperti "aba", pusat di 'b').
// - Genap (Even): Pusatnya adalah celah di antara dua karakter (seperti "abba", pusat di antara 'b' dan 'b').

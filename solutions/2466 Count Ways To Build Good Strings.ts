import expect from "./helpers/expect";
/* 12/29/2024
Given the integers zero, one, low, and high, we can construct a string by starting with an empty string, 
and then at each step perform either of the following:
- Append the character '0' zero times.
- Append the character '1' one times.

This can be performed any number of times.

A good string is a string constructed by the above process having a length between low and high (inclusive).

Return the number of different good strings that can be constructed satisfying these properties. 
Since the answer can be large, return it modulo 10^9 + 7.
*/

// DP, solution in M[low] + ... + M[high]
// Where M[n] represents the number of possible strings that can be built that many char long
// Base case M[zero] = 1, M[one] = 1. Otherwise init 0.
// Then M[next] = M[next - zero] + M[next - one] + M[next]
// We add current cell value just in case it was pre initialized
function countGoodStrings(low: number, high: number, zero: number, one: number): number {
    let M = new Array(high + 1);
    M.fill(0);

    M[zero] += 1;
    M[one] += 1;

    for (let i = Math.min(zero, one) + 1; i < M.length; i++) {
        let prevZero = i - zero >= 0 ? M[i - zero] : 0;
        let prevOne = i - one >= 0 ? M[i - one] : 0;

        M[i] = (prevZero + prevOne + M[i]) % (1e9 + 7); // Need to do this to not lose precision
    }

    let sum = 0;
    for (let i = low; i <= high; i++) {
        sum += M[i];
    }

    return sum % (1e9 + 7);
};

expect(8, countGoodStrings, 3, 3, 1, 1);
expect(5, countGoodStrings, 2, 3, 1, 2);
expect(873327137, countGoodStrings, 500, 500, 5, 2)
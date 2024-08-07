/* 8/7/2024
Convert a non-negative integer num to its English words representation.
Eg. 123 -> "One Hundred Twenty Three"
Eg. 1234567 -> "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"
*/

// Convert a non-negative integer num to its English words representation.
function numberToWords(num: number): string {
    // repeatedly get the last three digits of num, and append billion, million, thousand as needed
    const words = [];
    const units = ["", " Thousand", " Million", " Billion"];
    let unitIndex = 0;

    while (num > 0) {
        const threeDigits = num % 1000;
        if (threeDigits > 0) {
            words.unshift(threeDigitsToWords(threeDigits)+ units[unitIndex]);
        }
        num = Math.floor(num / 1000);
        unitIndex++;
    }

    if (words.length === 0) {
        return "Zero";
    }

    return words.join(" ");
};

const onesMap: { [key: number]: string } = {
    1: "One",
    2: "Two",
    3: "Three",
    4: "Four",
    5: "Five",
    6: "Six",
    7: "Seven",
    8: "Eight",
    9: "Nine",
    10: "Ten",
    11: "Eleven",
    12: "Twelve",
    13: "Thirteen",
    14: "Fourteen",
    15: "Fifteen",
    16: "Sixteen",
    17: "Seventeen",
    18: "Eighteen",
    19: "Nineteen"
}
const tensMap: { [key: number]: string } = {
    20: "Twenty",
    30: "Thirty",
    40: "Forty",
    50: "Fifty",
    60: "Sixty",
    70: "Seventy",
    80: "Eighty",
    90: "Ninety"
}

function threeDigitsToWords(num: number): string {
    const ones = num % 10; // 0-9
    const tens = num % 100 - ones; // 0-90
    const hundreds = Math.floor(num / 100); // 0-9
    
    const words = [];
    if (tens >= 20) {
        if (hundreds > 0) words.push(onesMap[hundreds] + " Hundred");
        words.push(tensMap[tens]);
        if (ones > 0) words.push(onesMap[ones]);
    } else { // handle 00-19
        if (hundreds > 0) words.push(onesMap[hundreds] + " Hundred");
        if (tens + ones > 0)words.push(onesMap[tens + ones]);
    }
    return words.join(" ");
}

function expect(actual: any, value: any) {
    let result = value === actual ? "\x1B[32m PASS \x1B[39m" : "\x1B[31m Failed \x1B[39m";
    console.log(`${result}: Expected '${value}', got '${actual}'\n`);
}

expect(threeDigitsToWords(0), "");
expect(threeDigitsToWords(2), "Two");
expect(threeDigitsToWords(19), "Nineteen");
expect(threeDigitsToWords(20), "Twenty");
expect(threeDigitsToWords(21), "Twenty One");
expect(threeDigitsToWords(118), "One Hundred Eighteen");

expect(numberToWords(123), "One Hundred Twenty Three");
expect(numberToWords(12345), "Twelve Thousand Three Hundred Forty Five");
expect(numberToWords(1234567), "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven");

expect(numberToWords(0), "Zero");
expect(numberToWords(10), "Ten");
expect(numberToWords(100), "One Hundred");
expect(numberToWords(1000), "One Thousand");
expect(numberToWords(10000), "Ten Thousand");
expect(numberToWords(100000), "One Hundred Thousand");
expect(numberToWords(1000000), "One Million");
expect(numberToWords(10000000), "Ten Million");
expect(numberToWords(100000000), "One Hundred Million");
expect(numberToWords(1000000000), "One Billion");
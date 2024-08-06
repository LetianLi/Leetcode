// Each details string is 15 char long with 
// The first ten characters consist of the phone number of passengers.
// The next character denotes the gender of the person.
// The following two characters are used to indicate the age of the person.
// The last two characters determine the seat allotted to that person.

// Return the number of passengers who are strictly more than 60 years old.
function countSeniors(details: string[]): number {
    return details.reduce((acc, curr) => {
        let tensDigit = parseInt(curr[11]);
        if (tensDigit > 6) { // if tens digit is greater than 6, then the person is older than 60 years old
            return acc + 1;
        } else if (tensDigit === 6 && parseInt(curr[12]) >= 1) {
            return acc + 1;
        }
        return acc;
    }, 0);
};


function expect(actual: number, value: number) {
    let result = value === actual;
    console.log(`Expected ${value}, got ${actual}, passed: ${result}\n`);
}

expect(countSeniors(["7868190130M7522", "5303914400F9211", "9273338290F4010"]), 2);
expect(countSeniors(["1313579440F2036", "2921522980M5644"]), 0);
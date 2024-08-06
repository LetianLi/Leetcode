function minimumDeletions(s: string): number {
    const counts = countBeforeAndAfters(s);

    let minDeletions = Infinity;

    for (let i = 0; i < counts.length; i++) {
        let bBefore = counts[i][0];
        let aAfter = counts[i][1];
        minDeletions = Math.min(minDeletions, bBefore + aAfter); // (bBefore + aAfter) is the number of deletions needed to balance at this index
    }

    return minDeletions;
};

// Count the number of b's and a's before and after each character
function countBeforeAndAfters(s: string): number[][] {
    let result = [[0, NaN]]; // each letter corresponds to [bBefore, aAfter]

    for (let i = 1; i < s.length; i++) {
        let bCount = (s[i - 1] === "b" ? 1 : 0) + result[i - 1][0];
        result[i] = [bCount, NaN];
    }

    result[s.length - 1][1] = 0;

    for (let i = s.length - 2; i >= 0; i--) {
        let aCount = (s[i + 1] === "a" ? 1 : 0) + result[i + 1][1];
        result[i][1] = aCount;
    }

    return result;
}

function expect(actual: number, value: number) {
    let result = value === actual;
    console.log(`Expected ${value}, got ${actual}, passed: ${result}\n`);
}

expect(minimumDeletions("aababbab"), 2);
expect(minimumDeletions("bbaaaaabb"), 2);
// Return true if you can make arr equal to target by only reversing subarrays of arr.
function canBeEqual(target: number[], arr: number[]): boolean {
    if (target.length !== arr.length) return false; // unnessary as this is constrained by problem

    target.sort((a, b) => a - b);
    arr.sort((a, b) => a - b);

    for (let i = 0; i < target.length; i++) {
        if (target[i] !== arr[i]) return false;
    }

    return true;
    
};

function expect(actual: any, value: any) {
    let result = value === actual;
    console.log(`Expected ${value}, got ${actual}, passed: ${result}\n`);
}

expect(canBeEqual([1, 2, 3, 4], [2, 4, 1, 3]), true);
expect(canBeEqual([7], [7]), true);
expect(canBeEqual([3, 7, 9], [3, 7, 11]), false);
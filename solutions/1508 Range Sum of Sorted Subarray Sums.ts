// sum all subarrays into a new array sorted nondecreasing, and return the sum of those between index left and right (indexed from 1)
function rangeSum(nums: number[], n: number, left: number, right: number): number {
    let sums: number[] = [];
    for (let i = 0; i < nums.length; i++) {
        let sum = nums[i];
        sums.push(sum);
        for (let j = i + 1; j < nums.length; j++) {
            sum += nums[j];
            sums.push(sum);
        }
    }

    console.log(sums);
    sums.sort((a, b) => a - b);
    console.log(sums);

    let sum = 0;
    const mod = 1e9 + 7;
    for (let i = left - 1; i < right; i++) {
        sum = (sum + sums[i]) % mod;
    }

    console.log(sum);

    return sum;
}

// Non working solution. incorrectly assumes nonsorted subarray sums
function debugRangeSum(nums: number[], n: number, left: number, right: number): number {
    let [startingNumIndex, startingRemainder] = findIndex(n, left - 1);
    let [endingNumIndex, endingRemainder] = findIndex(n, right - 1);

    let sum = 0;

    let counter = 1;
    for (let i = startingNumIndex; i < nums.length; i++) {
        let count = counter;
        if (i < startingNumIndex + startingRemainder) {
            count--;
        }
        if (i >= endingNumIndex + endingRemainder) {
            count--;
        }
        sum += nums[i] * count;
        counter++;
    }


    return sum;
};

// Convert a range index to the original index and return as [ogIndex, remainder]
function findIndex(n: number, rangeIndex: number): number[] {
    let ogIndex = 0;
    while (rangeIndex >= n) {
        rangeIndex -= n;
        n--;
        ogIndex++;
    }

    return [ogIndex, rangeIndex];
}

function expect(actual: any, value: any) {
    let result = value === actual;
    console.log(`Expected ${value}, got ${actual}, passed: ${result}\n`);
}

expect(rangeSum([1, 2, 3, 4], 4, 1, 5), 13);
expect(rangeSum([1, 2, 3, 4], 4, 3, 4), 6);
expect(rangeSum([1, 2, 3, 4], 4, 1, 10), 50);
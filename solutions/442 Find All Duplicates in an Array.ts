import expect from "./helpers/expect";
/* 8/8/2024
Given an integer array nums of length n where all the integers of nums are in the range [1, n] and 
each integer appears once or twice, return an array of all the integers that appears twice.

You must write an algorithm that runs in O(n) time and uses only constant extra space.
*/

function findDuplicates(nums: number[]): number[] {
    const duplicates: number[] = [];
    // When a number say n appears for the first time, we will set the number at the index n-1 to negative to mark it as visited.
    for (let i = 0; i < nums.length; i++) {
        let num = Math.abs(nums[i]);
        if (nums[num - 1] < 0) {
            duplicates.push(num);
        } else {
            nums[num - 1] = -nums[num - 1];
        }
    }

    return duplicates;
};

expect([2, 3], findDuplicates, [4, 3, 2, 7, 8, 2, 3, 1]);
expect([1], findDuplicates, [1, 1, 2]);
expect([], findDuplicates, [1]);
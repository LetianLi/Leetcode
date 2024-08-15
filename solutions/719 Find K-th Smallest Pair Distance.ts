import expect from "./helpers/expect";
/* 8/14/2024
The distance of a pair of integers a and b is defined as the absolute difference between a and b.

Given an integer array nums and an integer k, return the kth smallest distance 
among all the pairs nums[i] and nums[j] where 0 <= i < j < nums.length.
*/

function smallestDistancePair(nums: number[], k: number): number {
    // sort the array
    nums.sort((a, b) => a - b);

    // binary search through all the distances
    let low = 0;
    let high = nums[nums.length - 1] - nums[0];

    while (low < high) {
        // get binary search midpoint of distances
        let mid = Math.floor((low + high) / 2);

        // count how many pairs are less than or equal to mid
        let count = 0;
        let leftIndex = 0;
        // for each right index, add the number of pairs that work with it
        for (let rightIndex = 0; rightIndex < nums.length; rightIndex++) {
            // advance leftIndex until distance is less than or equal to mid
            while (nums[rightIndex] - nums[leftIndex] > mid) {
                leftIndex++;
            }
            // add the number of pairs to count
            count += rightIndex - leftIndex;
        }

        // adjust binary search bounds
        if (count < k) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    return low;
};

expect(0, smallestDistancePair, [1, 3, 1], 1);
expect(0, smallestDistancePair, [1, 1, 1], 2);
expect(5, smallestDistancePair, [1, 6, 1], 3);
expect(36, smallestDistancePair, [38, 33, 57, 65, 13, 2, 86, 75, 4, 56], 26);
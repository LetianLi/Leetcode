import expect from "./helpers/expect";
/* 8/16/2024
You are given m arrays, where each array is sorted in ascending order.

You can pick up two integers from two different arrays (each array picks one) and calculate the distance. 
We define the distance between two integers a and b to be their absolute difference |a - b|.

Return the maximum distance.

Each inner array is already sorted in ascending order.

eg. [[1,2,3],[4,5],[1,2,3]] => 4 (distance from 1 to 5)
eg. [[1],[1]] => 0
*/

function maxDistance(arrays: number[][]): number {
    let minVal = arrays[0][0];
    let maxVal = arrays[0][arrays[0].length - 1];
    let maxDist = 0;

    for (let i = 1; i < arrays.length; i++) {
        const arr = arrays[i];
        // check if this arr can create a bigger maxDist with previous minVal and maxVal
        maxDist = Math.max(maxDist, Math.abs(arr[arr.length - 1] - minVal), Math.abs(maxVal - arr[0]));
        minVal = Math.min(minVal, arr[0]);
        maxVal = Math.max(maxVal, arr[arr.length - 1]);
    }

    return maxDist;
};


expect(4, maxDistance, [[1, 2, 3], [4, 5], [1, 2, 3]]);
expect(0, maxDistance, [[1], [1]]);
expect(4, maxDistance, [[1, 4], [0, 5]]);
expect(3, maxDistance, [[1, 5], [3, 4]]);
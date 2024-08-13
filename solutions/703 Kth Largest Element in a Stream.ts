import expect from "./helpers/expect";
/* 8/12/2024
Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.

Implement KthLargest class:

KthLargest(int k, int[] nums) Initializes the object with the integer k and the stream of integers nums.
int add(int val) Appends the integer val to the stream and returns the element representing the kth largest element in the stream.

nums.length is guaranteed to be at least k.
*/

class KthLargest {
    array: number[]; // we don't have priority queue in JS :(
    k: number;

    constructor(k: number, nums: number[]) {
        this.array = nums.sort((a, b) => a - b).slice(-k);
        this.k = k;
    }

    add(val: number): number {
        if (this.array.length < this.k || this.array[0] < val) {
            const location = this.binarySearchInsertLocation(val);
            this.array.splice(location, 0, val);
            if (this.array.length > this.k) {
                this.array.splice(0, this.array.length - this.k);
            }
        }

        return this.array[0];
    }

    // Find where we can insert the new value in the array
    binarySearchInsertLocation(val: number): number {
        let low = 0;
        let high = this.array.length - 1;
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (this.array[mid] < val) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return low;
    }
}

function test(inputs: any[][]): any[] {
    const obj = new KthLargest(inputs[0][0], inputs[0][1]);
    const output: any[] = [null];
    for (let i = 1; i < inputs.length; i++) {
        output.push(obj.add(inputs[i][0]));
    }

    return output;
}

expect([null, 4, 5, 5, 8, 8], test, [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]);
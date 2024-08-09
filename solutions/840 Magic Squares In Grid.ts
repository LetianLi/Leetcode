import expect from "./helpers/expect";
/* 8/9/2024
A 3 x 3 magic square is a 3 x 3 grid filled with distinct numbers from 1 to 9 such that each row, column, and both diagonals all have the same sum.

Given a row x col grid of integers, how many 3 x 3 contiguous magic square subgrids are there?

Note: while a magic square can only contain numbers from 1 to 9, grid may contain numbers up to 15.
*/

function numMagicSquaresInside(grid: number[][]): number {
    let count = 0;
    for (let row = 0; row < grid.length - 2; row++) {
        for (let col = 0; col < grid[row].length - 2; col++) {
            if (isMagicSquare(row, col, grid)) {
                count++;
            }
        }
    }
    return count;
};

/*
A Magic Square's sum is always 1+2+3+...+9=45.
Each row has sum 45/3=15. Which generalizes to each row, column, and diagonal.
Possible sums are:
1+5+9
1+6+8
2+4+9
2+5+8
2+6+7
3+4+8
3+5+7
4+5+6
Thus 5 is always the middle element. 
*/
// row and col are the top left of the square.
function isMagicSquare(row: number, col: number, grid: number[][]): boolean {
    // center must be 5
    if (grid[row+1][col+1] !== 5) return false;

    // All must be unique and between 1-9
    const squareSet = new Array(9);
    for (let i = row; i < row + 3; i++) {
        for (let j = col; j < col + 3; j++) {
            let num = grid[i][j];
            if (num > 9 || num === 0 || squareSet.includes(num)) return false;
            squareSet[3 * i + j] = num;
        }
    }

    // opposite elements to center must sum to 10
    if (grid[row+1][col] + grid[row+1][col+2] !== 10) return false;
    if (grid[row][col+1] + grid[row+2][col+1] !== 10) return false;
    if (grid[row][col] + grid[row+2][col+2] !== 10) return false;
    if (grid[row+2][col] + grid[row][col+2] !== 10) return false;

    // Edges must sum to 15
    if (grid[row][col] + grid[row][col+1] + grid[row][col+2] !== 15) return false;
    if (grid[row+2][col] + grid[row+2][col+1] + grid[row+2][col+2] !== 15) return false;
    if (grid[row][col] + grid[row+1][col] + grid[row+2][col] !== 15) return false;
    if (grid[row][col+2] + grid[row+1][col+2] + grid[row+2][col+2] !== 15) return false;

    return true;
}


expect(1, numMagicSquaresInside, [[4, 3, 8, 4], [9, 5, 1, 9], [2, 7, 6, 2]]);
expect(0, numMagicSquaresInside, [[8]]);
expect(0, numMagicSquaresInside, [[5, 5, 5], [5, 5, 5], [5, 5, 5]]);
expect(0, numMagicSquaresInside, [[3, 4, 8, 1], [10, 7, 0, 8], [2, 6, 5, 4], [3, 2, 10, 3]]);
expect(0, numMagicSquaresInside, [[4, 1, 1, 8, 8, 0, 7], [3, 9, 0, 1, 8, 6, 6], [4, 2, 5, 8, 4, 3, 2], [6, 4, 10, 0, 5, 10, 4], [5, 3, 1, 7, 6, 2, 2], [7, 6, 7, 6, 1, 8, 10], [6, 8, 8, 4, 8, 4, 3]]);

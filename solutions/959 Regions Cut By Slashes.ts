import expect from "./helpers/expect";
/* 8/10/2024
An n x n grid is composed of 1 x 1 squares where each 1 x 1 square consists of a '/', '\', or blank space ' '. 
These characters divide the square into contiguous regions.

Given the grid grid represented as a string array, return the number of regions.

Note that backslash characters are escaped, so a '\' is represented as '\\'.
*/

function regionsBySlashes(grid: string[]): number {
    // We will turn each cell into a 3x3 grid, with 3 of said cells being blockers like "/" and "\"
    const bigGrid: number[][] = new Array(grid.length * 3);
    for (let i = 0; i < grid.length * 3; i++) {
        bigGrid[i] = new Array(grid.length * 3);
    }

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            switch (grid[i][j]) {
                case "/":
                    bigGrid[3*i][3*j+2] = 1;
                    bigGrid[3*i+1][3*j+1] = 1;
                    bigGrid[3*i+2][3*j] = 1;
                    break;
                case "\\":
                    bigGrid[3*i][3*j] = 1;
                    bigGrid[3*i+1][3*j+1] = 1;
                    bigGrid[3*i+2][3*j+2] = 1;
                    break;
            }
        }
    }

    // Now step through the big grid, and count how many times we need to flood fill
    let count = 0;
    for (let i = 0; i < bigGrid.length; i++) {
        for (let j = 0; j < bigGrid[i].length; j++) {
            // Flood fill if unvisited
            if (!bigGrid[i][j]) {
                count++;
                floodFill(bigGrid, i, j);
            }
        }
    }

    return count;
};

// Flood fill greedily from a given cell
const directions: number[][] = [[0, 1], [1, 0], [0, -1], [-1, 0]];
function floodFill(bigGrid: number[][], row: number, col: number) {
    const queue: number[][] = [[row, col]];

    bigGrid[row][col] = 1;

    while (queue.length > 0) {
        const [currentRow, currentCol] = queue.shift()!;
        
        for (const [rowOffset, colOffset] of directions) {
            const newRow = currentRow + rowOffset;
            const newCol = currentCol + colOffset;

            if (newRow < 0 || newRow >= bigGrid.length || newCol < 0 || newCol >= bigGrid[0].length) {
                continue;
            }

            if (!bigGrid[newRow][newCol]) {
                bigGrid[newRow][newCol] = 1;
                queue.push([newRow, newCol]);
            }
        }
    }
}

expect(1, regionsBySlashes, [" "]);
expect(2, regionsBySlashes, ["/"]);
expect(2, regionsBySlashes, ["\\"]);
expect(2, regionsBySlashes, [" /", "/ "]);
expect(1, regionsBySlashes, [" /", "  "]);
expect(2, regionsBySlashes, ["\\/", "  "]);
expect(4, regionsBySlashes, ["\\/", "/\\"]);
expect(3, regionsBySlashes, ["\\ ", "/\\"]);
import expect from "./helpers/expect";
/* 8/8/2024
You start at the cell (rStart, cStart) of an rows x cols grid facing east. 
The northwest corner is at the first row and column in the grid, and the southeast corner is at the last row and column.

You will walk in a clockwise spiral shape to visit every position in this grid. 
Whenever you move outside the grid's boundary, we continue our walk outside the grid (but may return to the grid boundary later.). 
Eventually, we reach all rows * cols spaces of the grid.

Return an array of coordinates representing the positions of the grid in the order you visited them.

Eg. {rows = 1, cols = 4, rStart = 0, cStart = 0} => [[0,0],[0,1],[0,2],[0,3]]
*/


function spiralMatrixIII(rows: number, cols: number, rStart: number, cStart: number): number[][] {
    const travelHistory: number[][] = [];

    let current = [rStart, cStart];
    travelHistory.push(current);

    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // step right, down, left, up

    let stepSize = 1;
    // we will step right, then down, then increment step size, then left, then up, and increment step size, and repeat
    while (stepSize < Math.max(rows, cols) * 2) {
        for (let dir = 0; dir < directions.length; dir++) {
            const [dr, dc] = directions[dir];

            for (let step = 0; step < stepSize; step++) {
                current = [current[0] + dr, current[1] + dc]; // (r+dr, c+dc)

                // check skip conditions
                if (dr === 0 && (current[0] < 0 || rows <= current[0])) { // skip if r doesn't change and is out of bounds
                    current = [current[0], current[1] - dc + dc * stepSize];
                    break;
                } else if (dc === 0 && (current[1] < 0 || cols <= current[1])) { // skip if c doesn't change and is out of bounds
                    current = [current[0] - dr + dr * stepSize, current[1]];
                    break;
                }

                // push if r and c are in bounds
                if (0 <= current[0] && current[0] < rows && 0 <= current[1] && current[1] < cols) {
                    travelHistory.push(current);
                }
            }

            if (dir === 1 || dir === 3) {
                stepSize++;
            }
        }
    }

    return travelHistory;
};

expect([[0, 0], [0, 1], [0, 2], [0, 3]], spiralMatrixIII, 1, 4, 0, 0);
expect([[1, 4], [1, 5], [2, 5], [2, 4], [2, 3], [1, 3], [0, 3], [0, 4], [0, 5], [3, 5], [3, 4], [3, 3], [3, 2], [2, 2], [1, 2], [0, 2], [4, 5], [4, 4], [4, 3], [4, 2], [4, 1], [3, 1], [2, 1], [1, 1], [0, 1], [4, 0], [3, 0], [2, 0], [1, 0], [0, 0]], spiralMatrixIII, 5, 6, 1, 4);

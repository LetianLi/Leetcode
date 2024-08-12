import expect from "./helpers/expect";
/*
You are given an m x n binary grid grid where 1 represents land and 0 represents water. An island is a maximal 4-directionally (horizontal or vertical) connected group of 1's.

The grid is said to be connected if we have exactly one island, otherwise is said disconnected.

In one day, we are allowed to change any single land cell (1) into a water cell (0).

Return the minimum number of days to disconnect the grid.

TLDR: Given a 2d binary grid, find how many 1s need to be removed such that there is either no 1s left or 2+ separate groups of 1s.
*/

/*
Workspace

All islands are going to have some corner piece. So Let's consider how to isolate said corner to split an island into two.

No Neighbors:
000
010 can be removed in 1 day
000

One Neighbor:
~1~
010 can be removed in 1 day
000

Two Neighbors:
~1~
110 can be removed in 2 days
000

Three or more Neighbors:
~1~
111 Don't bother, there's a better corner with 2 or less neighbors
000

Thus 0 days if theres no 1s, 1 day if theres a 1 with one neighbor, 2 days in all other cases.
Also 0 days if there are multiple islands.

HOWEVER, there might be one island that can be split into two in 1 day. 
*/

type Grid = number[][];
type Cell = [number, number];

interface ArticulationPointInfo {
    hasArticulationPoint: boolean;
    time: number;
}

const DIRECTIONS: Cell[] = [[0, 1], [1, 0], [0, -1], [-1, 0]];

function minDays(grid: Grid): number {
    const rows = grid.length;
    const cols = grid[0].length;
    const apInfo: ArticulationPointInfo = { hasArticulationPoint: false, time: 0 };

    let landCells = 0;
    let islandCount = 0;

    const discoveryTime: number[][] = Array(rows).fill(null).map(() => Array(cols).fill(-1));
    const lowestReachable: number[][] = Array(rows).fill(null).map(() => Array(cols).fill(-1));
    const parentCell: Cell[][] = Array(rows).fill(null).map(() => Array(cols).fill([-1, -1]));

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 1) {
                landCells++;
                if (discoveryTime[i][j] === -1) {
                    findArticulationPoints(grid, i, j, discoveryTime, lowestReachable, parentCell, apInfo);
                    islandCount++;
                }
            }
        }
    }

    if (islandCount !== 1) return 0;
    if (landCells === 1) return 1;
    return apInfo.hasArticulationPoint ? 1 : 2;
}

function findArticulationPoints(
    grid: Grid,
    row: number,
    col: number,
    discoveryTime: number[][],
    lowestReachable: number[][],
    parentCell: Cell[][],
    apInfo: ArticulationPointInfo
): void {
    const rows = grid.length;
    const cols = grid[0].length;

    discoveryTime[row][col] = apInfo.time;
    apInfo.time++;
    lowestReachable[row][col] = discoveryTime[row][col];

    let children = 0;

    for (const [dx, dy] of DIRECTIONS) {
        const newRow = row + dx;
        const newCol = col + dy;

        if (isValidLandCell(grid, newRow, newCol)) {
            if (discoveryTime[newRow][newCol] === -1) {
                children++;
                parentCell[newRow][newCol] = [row, col];
                findArticulationPoints(grid, newRow, newCol, discoveryTime, lowestReachable, parentCell, apInfo);
                lowestReachable[row][col] = Math.min(lowestReachable[row][col], lowestReachable[newRow][newCol]);

                if (lowestReachable[newRow][newCol] >= discoveryTime[row][col] && parentCell[row][col][0] !== -1) {
                    apInfo.hasArticulationPoint = true;
                }
            } else if (newRow !== parentCell[row][col][0] || newCol !== parentCell[row][col][1]) {
                lowestReachable[row][col] = Math.min(lowestReachable[row][col], discoveryTime[newRow][newCol]);
            }
        }
    }

    if (parentCell[row][col][0] === -1 && children > 1) {
        apInfo.hasArticulationPoint = true;
    }
}

function isValidLandCell(grid: Grid, row: number, col: number): boolean {
    return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length && grid[row][col] === 1;
}

expect(2, minDays, [[0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]]);
expect(2, minDays, [[1, 1]]);
expect(1, minDays, [[1, 1, 0, 1, 1], [1, 1, 1, 1, 1], [1, 1, 0, 1, 1], [1, 1, 0, 1, 1]]);
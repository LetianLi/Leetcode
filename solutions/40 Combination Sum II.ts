import expect from "./helpers/expect";
/* 8/13/2024
Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.

Each number in candidates may only be used once in the combination.

Note: The solution set must not contain duplicate combinations.
*/

function combinationSum2(candidates: number[], target: number): number[][] {
    const answer: number[][] = [];

    // sort candidates
    candidates.sort((a, b) => a - b);

    backtrack(answer, [], candidates, target, 0);

    return answer;
};

function backtrack(answer: number[][], currentEvaluation: number[], candidates: number[], remainder: number, startingIndex: number): void {
    if (remainder < 0) {
        // Backtrack, no solution to push
        return;
    }
    if (remainder === 0) {
        // Push solution and backtrack
        answer.push([...currentEvaluation]);
        return;
    }

    // We have some remainder left, so try all 
    for (let i = startingIndex; i < candidates.length; i++) {
        // Skip all repeated candidates except for the starting index one
        if (i > startingIndex && candidates[i] === candidates[i - 1]) {
            continue;
        }

        // Add candidate to current evaluation and evaluate
        currentEvaluation.push(candidates[i]);
        backtrack(answer, currentEvaluation, candidates, remainder - candidates[i], i + 1); // This will push when needed
        // Backtrack afterwards
        currentEvaluation.pop();
    }
}

expect([[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]], combinationSum2, [10, 1, 2, 7, 6, 1, 5], 8);
expect([[1, 2, 2], [5]], combinationSum2, [2, 5, 2, 1, 2], 5);
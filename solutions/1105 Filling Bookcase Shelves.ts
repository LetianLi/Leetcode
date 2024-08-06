function minHeightShelves(books: number[][], shelfWidth: number): number {
    // this array stores the min height of the bookcase before the ith book
    const minHeightBeforeIndex = new Array(books.length + 1);

    // Base cases
    minHeightBeforeIndex[0] = 0; // min height of an empty shelf
    minHeightBeforeIndex[1] = books[0][1]; // min height of a shelf with a single book (ie the 0th book)

    // Go through every book
    for (let i = 2; i <= books.length; i++) {
        // start by assuming this book goes on a new shelf
        let remainingShelfWidth = shelfWidth - books[i - 1][0];
        let max_height = books[i - 1][1];
        minHeightBeforeIndex[i] = books[i - 1][1] + (minHeightBeforeIndex[i - 1] || 0);

        // try seeing if adding previous books will reduce the previous shelf height, until all books used or ran out of shelf space
        let j = i - 1;
        while (j > 0 && remainingShelfWidth - books[j - 1][0] >= 0) {
            // update the newly added shelf's height and remaining width
            max_height = Math.max(max_height, books[j - 1][1]);
            remainingShelfWidth -= books[j - 1][0];

            // if a new smallest total height is found, update it.
            minHeightBeforeIndex[i] = Math.min(minHeightBeforeIndex[i], max_height + minHeightBeforeIndex[j - 1]);

            j--;
        }
    }

    return minHeightBeforeIndex[books.length];
};

function expect(actual: number, value: number) {
    let result = value === actual;
    console.log(`Expected ${value}, got ${actual}, passed: ${result}\n`);
}

expect(minHeightShelves([[1, 1], [2, 3], [2, 3], [1, 1], [1, 1], [1, 1], [1, 2]], 4), 6);

expect(minHeightShelves([[1, 3], [2, 4], [3, 2]], 6), 4);
/*
You are given a string word containing lowercase English letters.

Telephone keypads have keys mapped with distinct collections of lowercase English letters, which can be used to form words by pushing them. 
For example, the key 2 is mapped with ["a","b","c"], we need to push the key one time to type "a", two times to type "b", and three times to type "c".

It is allowed to remap the keys numbered 2 to 9 to distinct collections of letters. The keys can be remapped to any amount of letters, 
but each letter must be mapped to exactly one key. You need to find the minimum number of times the keys will be pushed to type the string word.

Return the minimum number of pushes needed to type word after remapping the keys.
*/

// We have 8 keys (2-9) to work with, which should first map to the most common letters.
function minimumPushes(word: string): number {
    
    // Count number of occurences
    const occurences: { [letter: string]: number } = {};
    for (const letter of word) {
        occurences[letter] = (occurences[letter] || 0) + 1;
    }

    // Sort by occurences
    const sortedOccurences = Object.entries(occurences).sort((a, b) => b[1] - a[1]);

    // Get the number of pushes needed
    let pushAccumulator = 0;
    let multiplier = 0; // increment multiplier for every 8 letters
    for (let i = 0; i < sortedOccurences.length; i++) {
        if (i % 8 === 0) multiplier++;
        pushAccumulator += sortedOccurences[i][1] * multiplier;
    }

    return pushAccumulator;
};

function expect(actual: number, value: number) {
    let result = value === actual;
    console.log(`Expected ${value}, got ${actual}, passed: ${result}\n`);
}

expect(minimumPushes("abcde"), 5);
expect(minimumPushes("xyzxyzxyzxyz"), 12);
expect(minimumPushes("aabbccddeeffgghhiiiiii"), 24);
const colors = {
    DEFAULT: "\x1B[39m",
    GREEN: "\x1B[32m",
    RED: "\x1B[31m",
    GREY: "\x1B[90m"
}

const coloredHeaders = {
    PARAMETERS: colors.GREY + "Parameters" + colors.DEFAULT,
    EXPECTED: colors.GREY + "Expected" + colors.DEFAULT,
    RECEIVED: colors.GREY + "Received" + colors.DEFAULT
};

const coloredResults = {
    PASS: colors.GREEN + "PASS" + colors.DEFAULT,
    FAIL: colors.RED + "FAIL" + colors.DEFAULT
};

let counter = 0;
let failedTests: number[] = [];

export default async function test(expectedValue: any, functionToTest: (...args: any[]) => any, ...args: any[]): Promise<void> {
    counter++;
    const startTime = Bun.nanoseconds();
    const functionResult = functionToTest(...args);
    const endTime = Bun.nanoseconds();
    const timeTaken = endTime - startTime;
    
    let timeTakenString = (timeTaken / 1000000).toFixed(6) + " ms";
    if (timeTaken < 1000) { // if less than 0.001 ms or less than 1000 ns, show nanoseconds instead
        timeTakenString = timeTaken.toFixed(0) + " ns";
    }

    const passed = Bun.deepEquals(expectedValue, functionResult);

    let functionString = functionToTest.name + "(" + args.map(x => Bun.inspect(x, { colors: true })).join(", ") + ")";

    if (passed) {
        console.log(`${counter}. ${coloredResults.PASS}: Took ${timeTakenString}.`);
        // console.log(`${coloredHeaders.PARAMETERS}: ${functionString}`);
        console.log(`${coloredHeaders.RECEIVED}:`, functionResult, "\n");
    } else {
        console.log(`${counter}. ${coloredResults.FAIL}: Took ${timeTakenString}.`);
        console.log(`${coloredHeaders.PARAMETERS}: ${functionString}`);
        console.log(`${coloredHeaders.EXPECTED}:`, expectedValue);
        console.log(`${coloredHeaders.RECEIVED}:`, functionResult, "\n");
        failedTests.push(counter);
    }
}

export function getTestInfo() {
    return {
        numTests: counter,
        failedTests: failedTests
    }
}
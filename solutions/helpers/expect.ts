import { sleep } from "bun";

const colors = {
    DEFAULT: "\x1B[39m",
    GREEN: "\x1B[32m",
    RED: "\x1B[31m"
}

const coloredResults = {
    PASS: colors.GREEN + "PASS" + colors.DEFAULT,
    FAIL: colors.RED + "FAIL" + colors.DEFAULT
}

let counter = 1;

export default async function test(expectedValue: any, functionToTest: (...args: any[]) => any, ...args: any[]): Promise<void> {
    const startTime = Bun.nanoseconds();
    const functionResult = functionToTest(...args);
    const endTime = Bun.nanoseconds();
    const timeTaken = endTime - startTime;
    
    let timeTakenString = (timeTaken / 1000000).toFixed(6) + " ms";
    if (timeTaken < 1000) { // if less than 0.001 ms or less than 1000 ns, show nanoseconds instead
        timeTakenString = timeTaken.toFixed(0) + " ns";
    }

    const passed = Bun.deepEquals(expectedValue, functionResult);

    if (passed) {
        console.log(`${counter}. ${coloredResults.PASS}: Took ${timeTakenString}.`);
        console.log("Received:", expectedValue, "\n");
    } else {
        console.log(`${counter}. ${coloredResults.FAIL}: Took ${timeTakenString}.`);
        console.log("Expected:", expectedValue);
        console.log("Received", functionResult, "\n");
    }

    counter++;
}
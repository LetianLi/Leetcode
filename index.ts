import { Glob } from "bun";
import { parseArgs } from "util";

// Parse args
const { values, positionals } = parseArgs({
    args: Bun.argv,
    options: {
        num: {
            type: "string",
            short: "n"
        }
    },
    strict: true,
    allowPositionals: true
});
const argNumber = values.num || positionals.findLast(x => !x.includes("/")) || ""; // Positionals includes some file paths which are filtered out

function getLatestModifiedFile(dir: string, prefixFilter: string = ""): { fileName: string, lastModifiedRelativeS: number } {
    let latestModification = 0;
    let latestModifiedName = "";
    for (const fileName of new Glob(prefixFilter + "*.ts").scanSync(dir)) {
        let lastModified = Bun.file(dir + "/" + fileName).lastModified;
        if (lastModified > latestModification) {
            latestModification = lastModified;
            latestModifiedName = fileName;
        }
    }

    if (latestModifiedName === "") throw new Error("No files found with the filter: " + dir + "/" + prefixFilter + "*.ts");

    return {
        fileName: dir + "/" + latestModifiedName,
        lastModifiedRelativeS: Math.floor((Date.now() - latestModification) / 1000)
    }
}

const latestFile = getLatestModifiedFile("./solutions", argNumber);

console.log(`Attempting to run file: '${latestFile.fileName}'`);
console.log(`Last modified ${latestFile.lastModifiedRelativeS}s ago`);
console.log("*********************************************************************\n");

import(latestFile.fileName);
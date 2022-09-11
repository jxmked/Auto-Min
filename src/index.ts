import envRes from "env-res";
import { Command } from "commander";
// @ts-ignore
import pkg from "../package.json";
import { existsSync, readdirSync } from "fs";

import { isAbsolute, normalize } from "path";

// import { platform } from 'node:process';
import start from "./start";
import empty_dir from "./components/merge-overwrite";

/**
* Validate Inputs
* */
export default (): void => {
    const cmd: Command = new Command();

    cmd
        .version(pkg.version, "-v, --version")
        .usage(`-i <input directory> -o <output directory> [options]`)
        .description(`${pkg.description}\n   Version:${pkg.version}`)
        .option("-i, --input <directory>", "An absolute input folder where files needs ti be minified")
        .option("-o, --output <directory>", "An absolute output folder where can be place minified version of an input files")
        .option("--overwrite", "Remove all contents of output directory before to start", false)
        .option("--merge", "Keep old files from output directory and overwrite the files that has been processed from input directory", false)

    const {
        input,
        output,
        merge,
        overwrite
    } = cmd.parse(process.argv).opts();

    cmd.addHelpText("after", "-".repeat(process.stdout.columns));

    /**
    *
    * I dont want to use required option of Commander
    * */

    const has: {[key: string]: boolean} = {
        error: false
    };

    if (! input || ! output) {
        cmd.addHelpText("after", " * Input or output cannot be empty");
        cmd.help();
        process.exit(-1);
    }

    // Check if input directory absolute
    // Check if input directory does exists
    if (! (isAbsolute(input) && existsSync(input))) {
        cmd.addHelpText("after", " * Input should be an absolute directory and does exists")
        cmd.addHelpText("after", "   Tip: You can use 'pwd' for linux and 'cd' for windows to get current directory\n");
        has.error = true;
    }

    // Check if output directory is absolute
    // Check if output directory does exists
    if (!(isAbsolute(output) && existsSync(output))) {
        cmd.addHelpText("after", " * Output should be an absolute directory and does exists");
        cmd.addHelpText("after", "   Tip: You can use 'pwd' for linux and 'cd' for windows to get current directory\n");
        has.error = true;
    }

    // Check if one of the directory is a sub folder of the other
    let a: string = input.toLowerCase().trim();
    let b: string = output.toLowerCase().trim();

    if (normalize(a) == normalize(b)) {
        cmd.addHelpText("after", "Input and output folder cannot be the same\n");
        has.error = true;
    }

    // Check if one of the directory is a sub of the other directory
    if (a.length > b.length) [a,
        b] = [b,
        a];

    if (b.substring(0, a.length) == a) {
        cmd.addHelpText("after", " * Input or output directory cannot be a sub folder of the opposite directory\n"); // I'm not sure about this.
        has.error = true;
    }

    // Check if input folder contains any files
    // If no files is able to process, just copy and paste it
    // into desired destination
    if (! has.error && readdirSync(input).length < 1) {
        cmd.addHelpText("after", " * It looks like input folder is empty\n");
        has.error = true;
    }

    // Check if output folder contains any files but both --overwrite and --merge is false
    if (! has.error && ! (overwrite || merge) && readdirSync(output).length > 0) {
        cmd.addHelpText("after", " * It looks like outout folder contains any files");
        cmd.addHelpText("after", "   Tip: You can use --overwrite or --merge flag to solve this");
        cmd.addHelpText("after", "   Check --help to see more\n");
        has.error = true;
    }

    // Check if overwrite and merge is both true
    // This is a conflict since one of them is useless if we keep
    // both of them is true
    if (overwrite && merge) {
        cmd.addHelpText("after", " * You cannot use --merge and --overwrite at the same time\n");
        has.error = true;
    }

    if (has.error) {
        cmd.help();
        process.exit(-1);
    }

    envRes.set("input", input);
    envRes.set("output", output);
    envRes.set("overwrite", overwrite);
    envRes.set("merge", merge);

    if (envRes.get("overwrite") == true) {
        console.log("Emptying...");
        const count: number = empty_dir(envRes.get("output"), (err: any) => {
            if (err)
                console.error("Emptied with errors");

            console.log(`Total of ${count} files and folders has been deleted\n`);
            if (!err)
                start();
        });
    } else {
        start();
    }

}
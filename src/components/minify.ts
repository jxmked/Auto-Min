import envRes from "env-res";
import { print_stats } from "../helpers/outputs";
import * as minifiers from "./minifier";
import { extname, dirname } from "path";
import { statSync, readFileSync,
    writeFileSync, copyFileSync } from "fs";
import mkdirp from "mkdirp";
import sc from "../helpers/size-converter";

interface FunctionReturn {
    hasError: boolean,
    output: string
};

const copy = (src: string, dest: string): boolean => {
    try {
        copyFileSync(src, dest);
        return false;
    }catch(err: any) {}
    return false;
};

export default (files: string[]) => {
    const methods: {[key: string]: any} = minifiers;

    files.forEach((file: string) => {
        const ext: string = extname(file).substring(1).toLowerCase();
        let diff: number = statSync(file).size

        // Replace input with output directory
        const outdir: string = file.replace(envRes.get("input"), envRes.get("output"));

        // Get the file contents
        const code: string = readFileSync(file, {
            encoding: "utf8",
            flag: "r"
        });

        // Create Output directories if does not exists
        mkdirp.sync(dirname(outdir));

        let res: FunctionReturn = {
            output: "",
            hasError: false
        };

        // Copy the file if its lessthan 1kb size/contents
        if (code.length < 1024) {
            // If we does not have avalable
            // minifier, just make a copy
            // and paste it on output folder.

            try {
                // I want to see if there was a changes
                // in old file(if exists) and new file
                //
                // May throw an error if output
                // file does not exists
                diff -= statSync(outdir).size;
            }catch(err: any) {}

            res.hasError = copy(file, outdir);

            print_stats(file.substring(envRes.get("input").length + 1), {
                diff: sc(diff),
                stat: (res.hasError) ? "Bad": "Copied"
            });

            return;
        } else {
            // If we have available minifier, then...
            res = methods[ext](file, code);
        }

        try {
            // Save results to a new/ouput directories
            writeFileSync(outdir, res.output, {
                encoding: "utf8",
                flag: "w"
            });
            diff -= statSync(outdir).size;
        } catch(err: any) {
            res.hasError = true;
        }

        print_stats(file.substring(envRes.get("input").length + 1), {
            diff: sc(diff),
            stat: (res.hasError) ? "Failed": "Okay"
        });
    });
};
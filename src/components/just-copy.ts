import { copyFileSync, statSync } from "fs";
import { dirname } from "path";
import envRes from "env-res";
import { print_stats } from "../helpers/outputs";
import sc from "../helpers/size-converter";
import mkdirp from "mkdirp";

const copy: Function = (src: string, dest: string): boolean => {
    try {
        mkdirp.sync(dirname(dest));

        // Read or write permission may break this...
        copyFileSync(src, dest);
        return true;
    } catch(err: any) {}
    return false;

};

export default (files: string[]): void => {
    files.forEach((file: string): void => {
        const out: string = file.replace(envRes.get("input"), envRes.get("output"));
        let diff: number = statSync(file).size;

        try {
            // Possible may not exists if
            // Output folders is empty or contains
            // other files
            diff -= statSync(out).size;
        } catch(err: any) {}

        const res: boolean = copy(file, out);

        print_stats(file.substring(envRes.get("input").length + 1), {
            // Using Failed word may confuse the user
            // Using emoji may not support other terminals
            stat: (res) ? "Copied": "Bad",
            diff: sc(diff)
        });
    });
};

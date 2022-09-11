import envRes from "env-res";
import get_files from "./components/get-files";
import { print } from "./helpers/outputs";
import * as MINIFIERS from "./components/minifier";
import {extname} from "path";
import minify from "./components/minify";
import justCopy from "./components/just-copy";
import { save_cache, load_cache } from "./components/cache";

const FORCE_EXCLUDE:string[] = [
    ".git", 
    "node_modules"
];

// Start
const availableTypes:string[] = Object.keys(MINIFIERS).map((x:string) => "." + x);

export default () => {
    // For Name cache featured by uglify-js
    load_cache("uglify-js-name-cache");

    console.log("Scanning directories...");

    let scanned_count:number = 0;
    const to_copy:string[] = [];

    // input and output directories can be change depending on validators
    const files:string[] = get_files(envRes.get('input'), {
        filter:(fpath:string, fname:string):boolean => {
            print(fpath.replace(envRes.get('input'), ""), {
                overwrite:true
            });
            
            scanned_count++;
            return true;
        },

        filter_folders:(fpath:string, filename:string):boolean => {
            filename = filename.toLowerCase();
            return !FORCE_EXCLUDE.some((value:string) => value.toLowerCase() == filename);
        },
        
        filter_files:(fpath:string, fname:string):boolean => {
            fname = fname.toLowerCase();
            let ext:string = extname(fname);
            
            // Skip all files with .min. before extension
            if(fname.endsWith(".min" + ext)) {
                to_copy.push(fpath);
                return false;
            }

            if(availableTypes.indexOf(ext) == -1) {
                to_copy.push(fpath);
                return false;
            }

            return true;
        }
    });

    print(`${scanned_count} files has been scanned`,{
        overwrite:true
    });
    
    console.log(`${files.length} files is about to minify`);

    // Copy files that does not have available minifier
    justCopy(to_copy);

    // Try to minify files that has support
    minify(files);

    // Save nameCache as json file after processing
    // Can be corrupted if the process has been
    // terminated while working...
    save_cache("uglify-js-name-cache");
};

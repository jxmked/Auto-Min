/**
*
* Perform merge or overwrite
*
* -- Merge
*  - Keep files from the output folder and make changes only to the files that
*  - that exists on input folder
*
* -- Overwrite
*  - Delete all files from the output folder before starting
*
* */

import { unlinkSync, rm } from "fs";
import get_files from "./get-files";
import mkdirp from "mkdirp";

type NoParamCallback = (err: NodeJS.ErrnoException | null) => void;

export default (parent: string, callback: NoParamCallback): number => {
    const folders: string[] = []
    let count: number = 0;

    get_files(parent, {
        filter_folders: (path: string): boolean => {
            folders.push(path);
            return true;
        }
    }).forEach((file: string) => {
        unlinkSync(file);
        count += 1;
    });

    rm(parent, {
        recursive: true,
        force: true
    }, callback);
    mkdirp.sync(parent);

    return folders.length + count;
};

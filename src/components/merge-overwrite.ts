
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

import {
	unlinkSync,
	rm
} from "fs";
import get_files from "./get-files";
import mkdirp from "mkdirp";

const empty_dir:Function = (parent:string, callback:Function):number => {
	const folders:string[] = []
	let count:number = 0;

	get_files(parent, {
		filter_folders:(path:string):boolean => {
			folders.push(path);
			return true;
		}
	}).forEach((file:string) => {
		unlinkSync(file);
		count += 1;
	});
	
	rm(parent, {recursive:true, force:true}, (err:any) => callback(err));
	mkdirp.sync(parent);

	return folders.length + count;
};


export default empty_dir;

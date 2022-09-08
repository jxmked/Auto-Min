import { readdirSync, statSync, existsSync } from "fs";
import {join} from "path";
import {FOType} from "../types";

const get_files:Function = (folder:string, files:string[],options:FOType):string[] => {
	options = Object.assign({
		filter_files:(dirname:string, filename:string) => true, 
		filter_folders:(dirname:string, filename:string) => true,
		filter:(dirname:string, filename:string) => true
	}, options);

	let full_path:string;

	readdirSync(folder, {
		withFileTypes:true
	}).forEach((file) => {
		full_path = join(folder, file.name);
		
		if(! options.filter(full_path, file.name))
			return;

		if(file.isDirectory() && options.filter_folders(full_path, file.name))
			get_files(full_path, files, options);
			
		if(! file.isDirectory() && options.filter_files(full_path, file.name))
			files.push(full_path)
		
	});

	return files;
}


export default (dirname:string, options:FOType={}):string[] => {
	if(!existsSync(dirname))
		throw new TypeError("Directory does not exists");

	return get_files(dirname, [], options);
};

import { readdirSync, statSync, existsSync } from "fs";
import { join } from "path";

interface FO {
	filter:(dirname:string, filename:string) => boolean,
	filter_folders:(dirname:string, filename:string) => boolean,
	filter_files:(dirname:string, filename:string) => boolean
};

interface FOO extends Partial<FO> {};

const get_files:Function = (folder:string, files:string[], options:FOO):string[] => {
	const funcs:FO = Object.assign({
		filter_files:(dirname:string, filename:string) => true, 
		filter_folders:(dirname:string, filename:string) => true,
		filter:(dirname:string, filename:string) => true
	}, options);

	let full_path:string;

	readdirSync(folder, {
		withFileTypes:true
	}).forEach((file) => {
		full_path = join(folder, file.name);
		
		if(! funcs.filter(full_path, file.name))
			return;

		if(file.isDirectory() && funcs.filter_folders(full_path, file.name))
			get_files(full_path, files, options);
			
		if(! file.isDirectory() && funcs.filter_files(full_path, file.name))
			files.push(full_path)
		
	});

	return files;
}


export default (dirname:string, options?:FOO):string[] => {
	if(!existsSync(dirname))
		throw new TypeError("Directory does not exists");

	return get_files(dirname, [], options);
};


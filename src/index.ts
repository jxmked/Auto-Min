
/**
 * Check if outputs are valid
 * */
import isValidDirectory from "./components/check-directories";
import envRes from "env-res";
import get_files from "./components/get-files";
import outputs from "./helpers/outputs";
import * as MINIFIERS from "./components/minifier";
import {extname} from "path";
import minify from "./components/minify";
import justCopy from "./components/just-copy";
import * as cache from "./components/cache";

const FORCE_EXCLUDE:string[] = [
	".git", 
	"node_modules"
];

// Start
const availableTypes:string[] = Object.keys(MINIFIERS).map((x:string) => "." + x);

export default () => {
	let input:string = "/storage/emulated/0/@webpage/online/beta";
	let output:string = "/storage/emulated/0/@webpage/online/minified";

	// These inputs will get modified after validating 
	envRes.set('input', input);
        envRes.set('output', output);

	// For Name cache featured by uglify-js
	cache.load_cache("uglify-js-name-cache");

	// Check if directories are valid
	if(! isValidDirectory())
		throw new TypeError("Directories is not valid");
	
	console.log("Scanning directories...");
	let scanned_count:number = 0;
	const to_copy:string[] = [];

	const files:string[] = get_files(envRes.get('input'), {
		filter:(fpath:string, fname:string):boolean => {
			outputs.print(fpath.replace(envRes.get('input'), ""), {
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
			
			// Skip all .min. files
			if(fname.endsWith(".min" + ext)) {
				to_copy.push(fpath);
				return false;
			}

			if(availableTypes.indexOf(ext) == -1) {
				to_copy.push(fpath);
				return false;
			}else{
				return true;
			}
		}

	});

	outputs.print(`${scanned_count} files has been scanned`,{overwrite:true});
	console.log(`${files.length} files is about to minify`);

	// Copy files that does not have available minifier
	justCopy(to_copy);

	// Tries to minify files that has support
	minify(files);


	cache.save_cache("uglify-js-name-cache");
};



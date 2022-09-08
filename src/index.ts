
/**
 * Check if outputs are valid
 * */
import isValidDirectory from "./components/check-directories";
import envRes from "env-res";
import get_files from "./components/get-files";
import outputs from "./helpers/outputs";

const FORCE_EXCLUDE:string[] = [
//	".git", 
//	"node_modules"
];

// Start

export default (input:string, output:string) => {
	// These inputs will get modified after validating 
	envRes.set('input', input);
        envRes.set('output', output);

	// Check if directories are valid
	if(! isValidDirectory())
		throw new TypeError("Directories is not valid");
	
	console.log("Scanning directories...");

	const files:string[] = get_files(envRes.get('input'), {
		filter:(fpath:string, fname:string):boolean => {
			outputs.print(fpath.replace(envRes.get('input'), ""), {
				overwrite:true
			});
			return true;
		},
		filter_folders:(fpath:string, filename:string):boolean => {
			filename = filename.toLowerCase();
			return !FORCE_EXCLUDE.some((value:string) => value.toLowerCase() == filename);
		}
	});
	console.log("\nScanned");
};



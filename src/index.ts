
/**
 * Check if output is valid
 * */
import isValidDirectory from "./components/check-directories";
import envRes from "env-res";
import get_files from "./components/get-files";

const FORCE_EXCLUDE:string[] = [
	".git", 
	"node_modules"
];

// Start
export default (input:string, output:string) => {
	envRes.set('input', input);
        envRes.set('output', output);

	// Check if directories are valid
	if(! isValidDirectory())
		throw new TypeError("Directories is not valid");
	
	const files:string[] = get_files(envRes.get('input'), {
		filter_folders:(fpath:string, filename:string) => {
			filename = filename.toLowerCase();
			return !FORCE_EXCLUDE.some((value:string) => value.toLowerCase() == filename);
		}
	});
};


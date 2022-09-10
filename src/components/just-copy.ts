import {copyFileSync, statSync} from "fs";
import { dirname } from "path";
import envRes from "env-res";
import outputs from "../helpers/outputs";
import sc from "../helpers/size-converter";
import mkdirp from "mkdirp";

const copy:Function = (src:string, dest:string):boolean => {
	try {
		mkdirp.sync(dirname(dest));

		// Read or write permission may break this...
		copyFileSync(src, dest);
		return true;
	} catch(err:any) {}
	return false;

};

export default (files:string[]):void => {
	const input:string = envRes.get("input");
	const output:string = envRes.get("output");

	files.forEach((file:string):void => {
		const out:string = file.replace(input, output);
		let d:number = 0;
		let s:number = statSync(file).size;

		try {
			// Possible may not exists if
			// Output folders is empty or contains
			// other files
			d = statSync(out).size;
		} catch(err:any){}

		const res:boolean = copy(file, out);

		outputs.print_stats(file.substring(input.length + 1), {
			// Using Failed word may confuse the user
			// Using emoji may not support other terminals
			stat:(res) ? "Copied":"Bad",
			diff:sc(s - d)
		});
	});
};

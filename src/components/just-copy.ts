import {copyFileSync, statSync} from "fs";
import envRes from "env-res";
import outputs from "../helpers/outputs";
import sc from "../helpers/size-converter";

const copy:Function = (src:string, dest:string):boolean => {
	try {
		copyFileSync(src, dest);
		return true;
	} catch(err:any) {}
	return false;

};

export default (files:string[]):void => {
	const input:string = envRes.get("input");
	const output:string = envRes.get("output");

	files.forEach((file:string):void => {
		// Check if file from output does exists
		const out:string = file.replace(input, output);
		let d:number = 0;
		let s:number = statSync(file).size;

		try {
			d = statSync(out).size;
		} catch(err:any){}

		const res:boolean = copy(file, out);

		outputs.print_stats(file.substring(input.length), {
			stat:(res) ? "Copied":"Bad",
			diff:sc(s - d)
		});
	});
};

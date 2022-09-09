import envRes from "env-res";
import outputs from "../helpers/outputs";
import * as minifiers from "./minifier";
import {extname, dirname} from "path";
import {statSync, readFileSync, writeFileSync} from "fs";
import mkdirp from "mkdirp";

interface FunctionReturn {
	hasError:boolean,
	output:string
};

export default (files:string[]) => {
	const input:string = envRes.get("input");
	const output:string = envRes.get("output");

	const methods:{[id:string]:any} = minifiers;

	files.forEach((file:string) => {
		const ext:string = extname(file).substring(1).toLowerCase();
		let diff:number = statSync(file).size

		// Replace input with output directory
		const outdir:string = file.replace(input, output);

		// Get the file contents 
		const code:string= readFileSync(file, {
			encoding:"utf8",
			flag:"r"
		});

		let res:FunctionReturn;
		if(code.length < 1024){
		   res = {
			   hasError:false,
			   output:code
		   }
		}else{
			// Minfication method...
			res = methods[ext](file, code);
		}

		// Create Directories
		mkdirp.sync(dirname(outdir));
		try {
			// Save results to a new/ouput directories
			writeFileSync(outdir, res.output, {encoding:"utf8",flag:"w"});
			diff -= statSync(outdir).size;
		} catch(err:any){
			res.hasError = true;
			console.error("error here");
		}

		outputs.print_stats(file.substring(input.length + 1), {
			diff:`${Math.abs(diff)}b`,
			stat:!res.hasError
		});
	});
};


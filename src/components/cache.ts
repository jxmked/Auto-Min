import envRes from "env-res";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import mkdirp from "mkdirp";


const ROOT:string = __dirname;

const load_cache:Function = (name:string):void => {
	try {
		const p:string = join(ROOT, `${name}.json`);
		let content:string = readFileSync(p, { encoding:"utf8" });
		
		// Validate
		content = JSON.stringify(JSON.parse(content));
		if(content.length < 2)
			content = "{}";
		envRes.set(name, content);
	}catch(err:any){
		envRes.set(name, "{}");
	}
};


const save_cache:Function = (name:string):void => {
	try {
		const p:string = join(ROOT, `${name}.json`);
		let content:string = envRes.get(name);

		// Try to parse then stringify for any errors
		content = JSON.stringify(JSON.parse(content));
		writeFileSync(p, content, { encoding:"utf8", flag:"w" });
	}catch(err:any){
		console.error("Failed to save cache");
	}
};


export {save_cache, load_cache}

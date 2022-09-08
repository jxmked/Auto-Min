/**
 * Check if output directory is not empty
 * Check if input and output directory is not the same
 * */


import envRes from "env-res";
import { readdirSync } from "fs";
import { resolve, normalize, sep } from "path";

const normalize_dir:Function = (dirname:string):string => {
	// Check if Absolute
	if(resolve(dirname) !== normalize(dirname)){
		dirname = resolve(process.cwd(), dirname);
	}

	// Replace slashes with system default
	return String(dirname).replaceAll(/(\/|\\)/g, sep);
}

let INPUT:string = "";
let OUTPUT:string = "";

// Check if input and output are the same or a sub dir of the opposite
const check_is_same_dir:Function = ():boolean => {
	let a:string = INPUT.toLowerCase();
	let b:string = OUTPUT.toLowerCase();

	// Same as string
	if(a == b)
		return true;
	return false;
	/*
	// Check if sub dir
	if(a.length > b.length)
		[a, b] = [b, a];
	
	return b.substring(0, a.length) == a; */
}

// Check if output is not empty
const is_not_empty:Function = (dirname:string):boolean => {
	return readdirSync(dirname).length != 0;
}

// Is valid?
export default ():boolean => {
	INPUT = normalize_dir(envRes.get("input"));
	OUTPUT = normalize_dir(envRes.get("output"));
	
	envRes.set("input", INPUT);
	envRes.set("output", OUTPUT);

	// Check if input is not empty
	return is_not_empty(INPUT) && ! (check_is_same_dir() && is_not_empty(OUTPUT));
}

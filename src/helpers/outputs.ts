/**
 * Stylish Console
 * */

declare global {
	const defaultColumns:number;
}

type optionsType = {[id:string]:boolean};

function outputs(){
}


/**
 * Print an output
 *
 * @param {string} str - String to print - required
 * @param {object} - overwrite, returnOutput, hasEllipsis
 * */

interface typeOptions {
	overwrite?:boolean,
	returnOutput?:boolean,
	hasEllipsis?:boolean 
};



outputs.print = (str:string, options?:typeOptions):string|void => {
	const {overwrite, returnOutput, hasEllipsis} = Object.assign({
		overwrite:false, // Overwrite last line from CL
		returnOutput:false, // Return output only without printing a line
		hasEllipsis:true // Add ellipsis if string is longer than CL width
	}, options);

	// Get command line width
	const cl_width:number = (process.stdout.columns || defaultColumns);

	// Trim string
	let result:string = String(str).normalize('NFKC').substring(0, cl_width);

	if(hasEllipsis && result.length >= cl_width)
		result = result.substring(0, result.length - 3) + "...";
	else
		result += " ".repeat(Math.abs(cl_width - result.length));

	if(overwrite) // Overwrite last command line
		result = `\r${result}`;

	if(returnOutput) // return output?
		return result;

	process.stdout.write(result);
};

interface statsType {
	diff:string,
	stat:boolean // True = ok, False = Failed
};

// Center a string between given width of spaces
const center:Function = (str:string, width:number):string => {
	const len:number = str.length;
	const reduce:number = Math.abs(width - len);
	const div:number = Math.floor(reduce / 2);
	let sample:number = div;

	while((div + sample + len) > width)
		sample -= 1;
	
	return " ".repeat(div) + str + " ".repeat(sample);
};

outputs.print_stats = (str:string, stats:statsType):void => {
	const cl_width:number = (process.stdout.columns || defaultColumns);
	const diff_width:number = 10;
	const stat_width:number = 10;
	const sb:string[] = []; // String Builder. By Java Hahaha
	const reduce_width:number = cl_width - stat_width - diff_width;
	const stat:string = (stats.stat) ? "OK" : "Failed";
	
	str = String(str).normalize("NFD");
	str = str.substring(0, reduce_width);

	if(str.length == reduce_width) {
		str = str.substring(0, str.length-4) +"..."; // Add ellipsis
	} else {
		// Add extra char to fill some empty cells and make a perfect thing...???
		const ma:number = Math.abs(reduce_width - str.length - 2);
		if(ma != 1)
			str += " " + "~".repeat(ma);

	}

	sb.push(str + " ");
	sb.push(center(stat, stat_width - 1));
	sb.push(center(stats.diff, diff_width - 1));

	process.stdout.write(sb.join("|") + "\n");
};

export default outputs;





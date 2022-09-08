/**
 * Stylish Console
 * */

declare global {
	const defaultColumns:number;
}

type optionsType = {[id:string]:boolean};

function outputs(){
}

export default outputs;

/**
 * Print an output
 *
 * @param {string} str - String to print - required
 * @param {object} - overwrite, returnOutput, hasEllipsis
 * */
outputs.print = (str:string, options?:optionsType):string|void => {
	const {overwrite, returnOutput, hasEllipsis} = Object.assign({
		overwrite:false, // Overwrite last line from CL
		returnOutput:false, // Return output only without printing a line
		hasEllipsis:true // Add ellipsis if string is longer than CL width
	}, options);

	// Get command line width
	const cl_width:number = (process.stdout.columns || defaultColumns);

	// Trim string
	let result:string = str.substring(0, cl_width);

	// Add empty spaces to replace the old chars from command line
	result += " ".repeat(cl_width - result.length);

	if(hasEllipsis && str.length >= cl_width)
		result = result.substring(-3) + "...";

	if(overwrite) // Overwrite last command line
		result = `\r${result}`;

	if(returnOutput) // return output?
		return result;

	process.stdout.write(result);
}





/**
 * Stylish Console
 * */

declare global {
	const defaultColumns:number;
}

function outputs(){
}

export default outputs;

/**
 * Print an output
 *
 * @param {string} str - String to print - required
 * @param {object} - overwrite, returnOutput, hasEllipsis
 * */
outputs.print = (str:string, {overwrite, returnOutput, hasEllipsis}={overwrite:true, returnOutput:false, hasEllipsis:true}):string => {
	const ci_width:number = (process.stdout.columns || defaultColumns);

	const len:number = str.length;
	const ellipsis:number = 3; // Ellipsis Length (.)

	const diff:number = (hasEllipsis) ? ci_width - len - ellipsis : ci_width - len;

	// We will overwrite the entire line to remove last content
	const stringBuilder:string[] = [str, " ".repeat(diff)];
	
	if(hasEllipsis)
		stringBuilder.push(".".repeat(ellipsis));

	if(overwrite)
		stringBuilder.unshift("\r");

	const result:string = stringBuilder.join("");

	if(! returnOutput)
		process.stdout.write(result);
	return result;
}





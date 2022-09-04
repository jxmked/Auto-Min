/**
 * Normalizer
 * */


export default function normalize() {
}


/**
 * String 
 * Encoding UTF-8
 * */
normalize.string = (str:string|number|boolean, method:string='NFD'):string => {
	return String(str).normalize(method);
}

normalize.strings = normalize.string;


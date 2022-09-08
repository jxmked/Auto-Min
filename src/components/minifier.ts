import uglifyjs from "uglify-js";
import cleancss from "clean-css";


type OptionType = {[id:string]:number|boolean|string|object};
type ObjectTypeResult = {[id:string]:string|boolean|number};

const JS:Function = (filename:string, code:string):ObjectTypeResult => {

	const options:OptionType = {
		nameCache:{},
		v8:true,
		compress:{
			drop_console:false, // Add as option 
			unsafe_undefined:true
		},
		mangle:{
			reserve:[], // Skip to minif
			toplevel:true, // Minify function names
			properties:{
				reserve:[]
			}
		},
		output:{
		// Add this as a feature later
		//	preamble:"Minified by Auto-Min using UglifyJS"
			quote_keys:true,
			quote_style: 2,
			shebang:true
		}
	};

	const result = uglifyjs.minify(code, options);
	
	return {
		output:result.code,
		hasError:result.error ? true : false
	};
};



const CSS:Function = (filename:string, code:string):ObjectTypeResult => {

	const options:OptionType = {
		compatibility: {
    			colors: {
      				hexAlpha: false, // controls 4- and 8-character hex color support
     				opacity: true // controls `rgba()` / `hsla()` color support
			},
			properties: {
				backgroundClipMerging: true, // controls background-clip merging into shorthand
				backgroundOriginMerging: true, // controls background-origin merging into shorthand
				backgroundSizeMerging: true, // controls background-size merging into shorthand
				colors: true, // controls color optimizations
				ieBangHack: false, // controls keeping IE bang hack
				ieFilters: false, // controls keeping IE `filter` / `-ms-filter`
				iePrefixHack: false, // controls keeping IE prefix hack
				ieSuffixHack: false, // controls keeping IE suffix hack
				merging: true, // controls property merging based on understandability
				shorterLengthUnits: false, // controls shortening pixel units into `pc`, `pt`, or `in` units
				spaceAfterClosingBrace: true, // controls keeping space after closing brace - `url() no-repeat` into `url()no-repeat`
				urlQuotes: true, // controls keeping quoting inside `url()`
				zeroUnits: true // controls removal of units `0` value
			},
			selectors: {
				adjacentSpace: false, // controls extra space before `nav` element
				ie7Hack: true, // controls removal of IE7 selector hacks, e.g. `*+html...`
				//mergeablePseudoClasses: [':active', ...], // controls a whitelist of mergeable pseudo classes
				//mergeablePseudoElements: ['::after', ...], // controls a whitelist of mergeable pseudo elements
				mergeLimit: 8191, // controls maximum number of selectors in a single rule (since 4.1.0)
				multiplePseudoMerging: true // controls merging of rules with multiple pseudo classes / elements (since 4.1.0)
			},
			units: {
				ch: true, // controls treating `ch` as a supported unit
				in: true, // controls treating `in` as a supported unit
				pc: true, // controls treating `pc` as a supported unit
				pt: true, // controls treating `pt` as a supported unit
				rem: true, // controls treating `rem` as a supported unit
				vh: true, // controls treating `vh` as a supported unit
				vm: true, // controls treating `vm` as a supported unit
				vmax: true, // controls treating `vmax` as a supported unit
				vmin: true // controls treating `vmin` as a supported unit
			}
		}
	};

	const result = new cleancss(options).minify(code);

	return {
		output:result.styles,
		hasError:result.errors ? true : false
	};


}




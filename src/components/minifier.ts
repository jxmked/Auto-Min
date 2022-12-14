import uglifyjs from "uglify-js";
import cleancss from "clean-css";
import envRes from "env-res";
import { MinifyOptions } from "../../node_modules/@types/uglify-js/index";
import JSON_MINIFY from "jsonminify";
import HTML_MINIFIER from "html-minifier";

interface FunctionReturn {
    hasError: boolean,
    output: string
};

const JS: Function = (filename: string, code: string): FunctionReturn => {
    const nameCache: object = JSON.parse(envRes.get("uglify-js-name-cache"));
    const options: MinifyOptions = {
        // Preserve functions name so we can reuse the it from diffrent files
        nameCache: nameCache,
        compress: {
            //    drop_console:false, // Add as option
            unsafe_undefined: false
        },
        mangle: {
            //    reserve:[], // Skip to minif
            toplevel: true,
            // Minify function names
            /*    properties:{
                reserve:[]
            } */
        },
        output: {
            // Add this as a feature later
            //    preamble:"/** Minified by Auto-Min using UglifyJS **/"
            quote_keys: true,
            quote_style: 2
            //    shebang:true
        }
    };

    const result = uglifyjs.minify(code, options);

    envRes.set("uglify-js-name-cache", JSON.stringify(options.nameCache));

    return {
        output: result.code,
        hasError: (typeof result.error != void 0) ? false: true
    };
};

const CSS: Function = (filename: string, code: string): FunctionReturn => {
    const options: object = {
        compatibility: {
            colors: {
                hexAlpha: true,
                // controls 4- and 8-character hex color support
                opacity: true // controls `rgba()` / `hsla()` color support
            },
            
            properties: {
                backgroundClipMerging: true,
                // controls background-clip merging into shorthand
                backgroundOriginMerging: true,
                // controls background-origin merging into shorthand
                backgroundSizeMerging: true,
                // controls background-size merging into shorthand
                colors: true,
                // controls color optimizations
                ieBangHack: true,
                // controls keeping IE bang hack
                ieFilters: true,
                // controls keeping IE `filter` / `-ms-filter`
                iePrefixHack: true,
                // controls keeping IE prefix hack
                ieSuffixHack: true,
                // controls keeping IE suffix hack
                merging: true,
                // controls property merging based on understandability
                shorterLengthUnits: false,
                // controls shortening pixel units into `pc`, `pt`, or `in` units
                spaceAfterClosingBrace: true,
                // controls keeping space after closing brace - `url() no-repeat` into `url()no-repeat`
                urlQuotes: true,
                // controls keeping quoting inside `url()`
                zeroUnits: false // controls removal of units `0` value
            },
            
            selectors: {
                adjacentSpace: false,
                // controls extra space before `nav` element
                ie7Hack: true,
                // controls removal of IE7 selector hacks, e.g. `*+html...`
                //mergeablePseudoClasses: [':active', ...], // controls a whitelist of mergeable pseudo classes
                //mergeablePseudoElements: ['::after', ...], // controls a whitelist of mergeable pseudo elements
                mergeLimit: 8191,
                // controls maximum number of selectors in a single rule (since 4.1.0)
                multiplePseudoMerging: true // controls merging of rules with multiple pseudo classes / elements (since 4.1.0)
            },
            
            units: {
                ch: true,
                // controls treating `ch` as a supported unit
                in: true,
                // controls treating `in` as a supported unit
                pc: true,
                // controls treating `pc` as a supported unit
                pt: true,
                // controls treating `pt` as a supported unit
                rem: true,
                // controls treating `rem` as a supported unit
                vh: true,
                // controls treating `vh` as a supported unit
                vm: true,
                // controls treating `vm` as a supported unit
                vmax: true,
                // controls treating `vmax` as a supported unit
                vmin: true // controls treating `vmin` as a supported unit
            }
        }
    };

    const result = new cleancss(options).minify(code);

    return {
        output: result.styles,
        hasError: (result.errors.length > 0) ? true: false
    };


}

const HTML: Function = (filename: string, code: string): FunctionReturn => {
    const min_js: Function = (code: string) => {
        return JS("", code).output;
    };

    const min_css: Function = (code: string) => {
        return CSS("", code).output;
    };

    const options: object = {
        //    includeAutoGeneratedTags: true,
        removeAttributeQuotes: false,
        removeComments: true,
        //    removeRedundantAttributes: true,
        removeScriptTypeAttributes: false,
        removeStyleLinkTypeAttributes: false,
        removeEmptyAttributes: true,
        //    sortClassName: false,
        //    useShortDoctype: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        collapseInlineTagWhitespace: true,
        qouteCharacter: "\"",
        minifyJS: min_js,
        minifyCSS: min_css
    };

    const result = HTML_MINIFIER.minify(code, options);

    return {
        output: result,
        hasError: false
    };
}


const _JSON_: Function = (filename: string, code: string): FunctionReturn => {
    let result = JSON_MINIFY(code);
    let hasError: boolean = false;

    try {
        result = JSON.stringify(JSON.parse(result));
    }catch(err: any) {
        hasError = true;
    }

    return {
        output: result,
        hasError: hasError
    };
};

/**
* Add your custom function here
* */

/**
* Set your target extension here
* */
export {
    JS as js,
    CSS as css,
    HTML as html,
    _JSON_ as json
};
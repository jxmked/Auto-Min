const fs = require('fs');
const HJSON = require('hjson');
const path = require('path');

function exists(path) {
    return fs.existsSync(path);
}

function isFile(path) {
    return (exists(path) && !fs.lstatSync(path).isDirectory());
}

function isFolder(path) {
    return (exists(path) && fs.lstatSync(path).isDirectory());
}

function parseJSON(text) {
    return HJSON.rt.parse(text);
}


const configs = (function(config_value){
    function getConfig(){
        if(! config_value) {
                /** Parsing Config File **/
                /**
                 *  Any other way for this?
                 * */
                let data = fs.readFileSync(`${path.resolve(__dirname, '..')}/config.json`, {
                     encoding: "utf8", 
                     flag: "r"
                });
                
                config_value = parseJSON(data);
            }
            
            return config_value;
    }
    
    return getConfig();
})("");


function overwritePrint(str) {
    const thr = 1;
    const width = (process.stdout.columns || defaultColumns) + thr;
    
    let res = String(str).substr(0, width);
    let diff = width - res.length;
    
    if( diff == 0){
        res = res.substr(0, res.length - (3 + thr)) + "...";
    } else {
        res = res + " ".repeat(diff - thr);
    }
    
    process.stdout.write(`${res}\r`);
}

function mkdir(path) {
    if(!exists(path)) {
        fs.mkdirSync(path, {recursive:true});
    }
}



module.exports = { 
    exists , isFolder, isFile, parseJSON, configs, 
    overwritePrint, mkdir };
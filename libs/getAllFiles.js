const fs = require('fs');
const path = require('path');
const { exists, isFolder, isFile, configs, overwritePrint } = require('../lib/helpers.js');

let SCANNED = [];

// Recursion
function Start(input, printProgress=true){
    const contents = fs.readdirSync(input);
    contents.forEach((content) => {
        let file_path = path.join(input, content);
        
        /**
         * Exclude files/folder from config.json
         * */
        if(configs.exclude.indexOf(String(content).toLowerCase()) != -1)
           return; // Continue
        
        if(isFolder(file_path))
            Start(file_path, printProgress);
        
        if(printProgress)
            overwritePrint(file_path.replace(process.cwd(), ""));
        
        SCANNED.push(file_path);
    });
    
    return SCANNED;
}


function getScanned() {
    return SCANNED;
}

function reset(){
    SCANNED = [];
}




module.exports = { Start, getScanned, reset }
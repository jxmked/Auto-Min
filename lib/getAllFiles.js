const fs = require('fs');
const path = require('path');
const { exists, isFolder, isFile, configs, overwritePrint } = require('../lib/helpers.js');

const SCANNED = [];

// Recursion
function Start(input){
    const contents = fs.readdirSync(input);
    contents.forEach((content) => {
        let file_path = path.join(input, content);
        
        /**
         * Exclude files/folder from config.json
         * */
        if(configs.exclude.indexOf(String(content).toLowerCase()) != -1)
           return; // Continue
        
        if(isFolder(file_path))
            Start(file_path);
        
        overwritePrint(file_path)
        
        SCANNED.push(file_path);
    });
}


function getScanned() {
    return SCANNED;
}




module.exports = { Start, getScanned }
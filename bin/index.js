#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const argParser = require('commander');
const { exists, overwritePrint, configs, mkdir, isFolder } = require('../lib/helpers.js');
const { Start, getScanned } = require('../lib/getAllFiles.js');
const logger = require('../lib/logger.js');
const minify = require('../lib/minify.js');

// Package Info
const pkg = require('../package.json');

/** Argument Parser **/
argParser
    .version(pkg.version, "-v,, --version")
    .description(`${pkg.description}.\nVersion: ${pkg.version}.`)
    .requiredOption('-i, --input <string>', 'Specify an input directory')
    .requiredOption('-o, --output <string>', 'Specify an output directory.')
    .option('-w, --overwrite', 'Overwrite existing files and folders.', false)

argParser.parse(process.argv);
const args = argParser.opts();
/** * * * * * */

// Input and Output Folders
global.input = path.join(process.cwd(), args.input);
global.output = path.join(process.cwd(), args.output);
global.overwrite = (args.overwrite) ? true : false;

// Check input directory from parent directory if exist 
if(!exists(input)) {
    console.error("Input folder should be existing.");
}

// Start Scanning
process.stdout.write(`Scanning directory: ${global.input}\n`);
Start(global.input);
overwritePrint(`Scanned ${getScanned().length} files and folders.`);
console.log();

const FOLDERS = [];
const FILES = [];

// Seperate Folder and Files
getScanned().forEach((value) => {
    if(isFolder(value)) {
        FOLDERS.push(value);
        
        // Create Folder Structure
        mkdir(value.replace(global.input, global.output));
    } else {
        FILES.push(value);
    }
})

// Get Modifed Files
const modified = logger.getModifiedFiles(FILES);

if(modified.length > 0) {
    console.log(`About ${modified.length} file(s) has been modified.\n`);
    
    // Start Minification
    console.log("\nMinifying...");
    minify.setInOut(global.input, global.output);
    
    // Start and get files that failed to take actions
    const failed = minify.start(modified);
    console.log("\n");
    
    // Save files that has been minified or copied
    logger.saveLogs(FILES.filter((file) => {
        return failed.indexOf(file) == -1;
    }));
    
    overwritePrint('Minified!');
} else {
    console.log("Looks clean...");
}

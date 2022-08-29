#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const argParser = require('commander');
const { exists, overwritePrint } = require('../lib/helpers.js');
const { Start, getScanned } = require('../lib/getAllFiles.js');



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
overwritePrint(`Scanned ${getScanned().length} files and folders.\n`);
//StartLogging();
//CreateMirror();

//console.log(getScanned())
const fs = require('fs');
const hash = require('md5');
const path = require('path');
const { exists, isFolder, isFile, configs, mkdir } = require('../lib/helpers.js');

const LOG_FILE = ".hashed.json";
const path_to_log_file = path.join(process.cwd(),configs.config_dir, LOG_FILE);


/** Create Data Folder in user parent working dir **/
mkdir(path.join(process.cwd(), configs.config_dir));

if(!exists(path_to_log_file)) {
    fs.writeFileSync(path_to_log_file, "{}");
}

/**
 *  I want it to run faster
 * */
 
// Open log file
const RECORDS = JSON.parse(fs.readFileSync(path_to_log_file, "utf8"));
const RECORD_KEYS = Object.keys(RECORDS);

const TMP_RECORDS = {};

function isModified(file){
    /**
     * This hashing thing can be expensive to process
     * in some different files.
     * */
    TMP_RECORDS[file] = hash(fs.readFileSync(file));
    
    if(RECORD_KEYS.indexOf(file) == -1) {
        // No record 
        return true;
    }
    
    if(String(RECORDS[file]).trim() != String(TMP_RECORDS[file]).trim()) {
        // Modified
        return true;
    }
    
    return false;
}

function getModifiedFiles(files){
    return files.filter((file) => {
        return isModified(file);
    });
}

function saveLogs(new_logs) {
    const to_save = {};
    new_logs.forEach((valid) => {
        to_save[valid] = TMP_RECORDS[valid];
    })
    
    fs.writeFileSync(path_to_log_file, JSON.stringify(to_save));
}

module.exports = { getModifiedFiles, saveLogs };

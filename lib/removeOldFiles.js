const fs = require('fs');
const { Start, getScanned, reset } = require('./getAllFiles.js');
const { isFolder } = require('./helpers.js');
let OUTPUT = "";
let INPUT = "";

function startRemoving() {
    const OLD = getScanned();
    reset();
    Start(OUTPUT, false);
    const LATEST = getScanned();
    
    const diff = LATEST.filter((fOut) => {
        return OLD.indexOf(fOut.replace(OUTPUT, INPUT)) == -1; 
    });
    
    diff.map((toDelete) => {
        try {
            if(isFolder(toDelete)) {
                fs.rm(toDelete, {recursive:true}, (e)=>{});
            }else {
                fs.unlinkSync(toDelete);
            }
        } catch(e) {
            console.error(e)
        }
    })
    
}

module.exports = {
    setInOut: (x, y) => {INPUT = x; OUTPUT = y},
    startRemoving
}
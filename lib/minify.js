const fs = require('fs');
const path = require('path');
const { overwritePrint } = require('./helpers.js');
const minifier = require("./minifier");

let INPUT = "";
let OUTPUT = "";
const FAILED = [];

function start(FILES) {
    FILES.forEach((file) => {
        let txt_to_display = file.replace(process.cwd(), "");
        
        try {
            let ext = path.extname(file).substr(1);
            
            /**
             * copy all files with '.min.' before extention
             * */
            if(file.endsWith(`.min.${ext}`)) {
                throw new TypeError("Minified File");
            }
            
            if(ext.length > 0) {
                overwritePrint(txt_to_display);
                let minified = minifier[ext](fs.readFileSync(file, {encoding:'utf8'}));
                fs.writeFileSync(file.replace(INPUT, OUTPUT), minified);
            } else {
                throw new TypeError("Not a function");
            }
        } catch(e) {
            if(e instanceof TypeError){
                fs.copyFile(file, file.replace(INPUT, OUTPUT), (err) => {
                    if(err) {
                        overwritePrint(`${txt_to_display}: Failed`);
                        FAILED.push(file);
                    } else {
                        overwritePrint(txt_to_display);
                    }
                });
            } else {
                console.error(e)
                console.error(`${txt_to_display}: Failed`);
                FAILED.push(file);
            }
        }
    })
    
    return FAILED;
}

function setInOut(x, y) {
    INPUT = x;
    OUTPUT = y;
}

module.exports = {
    start,
    setInOut
}
# Automin

Create minified mirror of your JS, CSS, HTML, JSON files. 


## Installation

With NPM: `npm install -g automin`

or

- `git clone https://github.com/jxmked/Auto-Min.git`
- `cd Auto-Min && npm install && npm link .`


## Command

| Flags | Description | Action |
| :---: | :---: | :---: |
| -h, --help | Print Help | Optional |
| -i, --input | Input Directory | Required |
| -o, --output | Output Directory | Required |
| --overwrite | Remove all files from output folder | Optional |
| --merge | Keep old files from outout folder and overwrite files that has been processed from input folder | optional |

> Note: --merge and --overwrite cannot be use at the same time

## Notes:

- Output folder will be overwritten and remove files that doesn't belong to original copies
- Install it globally

## Some Notes

Can work Offline after installation.

Easy To use, just `automin -i <input> -o <output>` and wait until its done.

Using uglifyjs `nameCache` feature to preserve function names for next-file-use.

Files with file format of `.js .css, .html, .json` can be minified.

Other minifiers can be implemented easily by editing `./src/components/minifier.ts` file.

Except for files with `.min.` before extension.

Force skip for `.git` and `node_modules`

## Dependencies
- [UglifyJS](https://github.com/mishoo/UglifyJS)
- [HTML-minifier](https://github.com/kangax/html-minifier)
- [clean-css](https://github.com/clean-css/clean-css)
- [jsonminify](https://github.com/fkei/JSON.minify)
- [commander.js](https://github.com/tj/commander.js)
- [node-mkdirp](https://github.com/substack/node-mkdirp)
- [env-res](https://github.com/jxmked/NPM-Environment-Variables)

----

#### Written by Jovan De Guia

## Socials

- [Github](https://github.com/jxmked)
- [Facebook](https://www.facebook.com/deguia25)

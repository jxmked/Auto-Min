# Automin

Create minified mirror of your JS, CSS, HTML, JSON files. 


## Installation

With NPM: `npm install -g automin`

or

- `git clone https://github.com/jxmked/Auto-Min.git`
- `cd Auto-Min && npm i -g`


## Command

| Flags | Description | Action |
| :---: | :---: | :---: |
| -h, --help | Print Help | Optional |
| -i, --input | Input Directory | Required |
| -o, --output | Output Directory | Rrquired |

## Notes:

- Output folder will be overwritten and remove files that doesn't belong to original copies
- Install it globally

## Description

Create minified mirror version of you codes written in JavaScript, Css, Html and JSON.
Automatically remove and keep the same infrastructure of yoyr original code BUT minified.
Can work Offline after installation.

Easy To use, just `automin -i <input> -o <output>` and wait until its done.

It may takes time at first launch.

And in the next launch only the modified file(s) will be minified or copy to the mirror version.

Files with file format of `.js .css, .html, .json` will be minified.

Except for files with `.min.js, .min.css, .min.json, .min.html` at the end.

Force skip for `.git, package.json, package-lock.json, .vscode, .github` files and folder.

## Dependencies
- [UglifyJS](https://github.com/mishoo/UglifyJS)
- [css-minify](https://github.com/purple-force/css-minify)
- [HTML-minifier](https://github.com/kangax/html-minifier)
- [JSON-minify](https://github.com/getify/JSON.minify)
- [commander.js](https://github.com/tj/commander.js)
- [node-md5](https://github.com/pvorb/node-md5)
- [hjson-js](https://github.com/hjson/hjson-js)

----

#### Written by Jovan De Guia

## Socials

- [Github](https://github.com/jxmked)
- [Facebook](https://www.facebook.com/deguia25)

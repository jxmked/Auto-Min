import { Command } from 'commander';

// @ts-ignore
import pkg from '../../package.json';


const cmd:Command = new Command();

cmd.usage("automin -i <input folder> -o <output folder>")
	.version(pkg.version, "-v, --version")
	.description(`${pkg.description}\n  ${pkg.version}`)
	// I don't want to use .requireOption();
	.option('-i, --input <directory>', 'Create minified mirror version of this directory')
	.option('-o, --output', 'Output directory')


export {};

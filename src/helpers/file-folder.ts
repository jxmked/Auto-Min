/**
 * Check if directory or file exists
 * */

import { existsSync, lstatSync } from 'fs';

function file_folder(){
}

function file(path:string){
	

}

function folder(path:string){
}

export default file_folder;
export { file, folder };

/**
 * Check if file or folder exists
 * */
file_folder.is_exists = (path:string):boolean => existsSync(path);
file_folder.isExists = file_folder.is_exists;
file_folder.exists = file_folder.is_exists;

/**
 * Check if is file (true) or folder (false)
 * */
file_folder.is_file = (path:string):boolean => file_folder.is_exists(path) && lstatSync(path).isFile();
file_folder.isFile = file_folder.is_file;

/**
 * Check if is folder (true) otherwise file
 * */
file_folder.is_folder = (path:string):boolean => file_folder.is_exists(path) &&  lstatSync(path).isDirectory();
file_folder.isFolder = file_folder.is_folder;
file_folder.isDirectory = file_folder.is_folder;


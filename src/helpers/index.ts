/**
 * Bundling Helpers
 * */

const DEF:{[id:string]:Function} = {};
export default DEF;



/**
 * Normalize
 * - String|Strings
 * */
import normalize from './normalize';
export {normalize};

DEF['normalize'] = normalize;

/**
 * File Folder
 * */
import file_folder, { file as __file, folder as __folder } from './file-folder';
export { file_folder, __file as file, __folder as folder };

DEF['file_folder'] = file_folder;


/**
 * Original
 * https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
 * */

export default (bytes:number, decimals:number = 2):string => {
    if (!+bytes) return '0B'

    const k:number = 1024
    const dm:number = decimals < 0 ? 0 : decimals
    const sizes:string[] = ['B', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

    const i:number = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))}${sizes[i]}`
};


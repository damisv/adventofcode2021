let fs = require('fs').promises;

/**
 * 
 * @param {*} data 
 * @returns Array of strings
 */
function toStringAndSplitBy(data, separator = "\n") {
    return data.toString().split(separator);
}

/**
 * 
 * @param {*} data 
 * @param {*} radix 
 * @returns 
 */
function toInteger(data, radix = 10) {
    return data.map((string) => parseInt(string, radix));
}

/**
 * 
 * @param {*} path 
 * @param {*} transformers 
 * @returns 
 */
async function readFile(path, transformers = [toStringAndSplitBy]) {
    const data = await fs.readFile(path);

    if (!transformers.length) return data;

    let temp = data;
    for (const transformer of transformers) {
        temp = transformer(temp);
    }

    return temp;
}

module.exports = {
    readFile,

    toStringAndSplitBy,
    toInteger
};
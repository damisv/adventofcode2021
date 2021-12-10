const { readFile, toStringAndSplitBy, toInteger, proxyFormatter } = require("../../utils");
const { resolve } = require("path");

function countUniqueValues(input) {
    let count = 0;

    const regex = /(\b\w{2}\b)|(\b\w{3}\b)|(\b\w{4}\b)|(\b\w{7}\b)/gm;

    for (let i = 0; i < input.length; i++) {
        count += (input[i][1].match(regex) || []).length;
    }

    return count;
}

/**
 * 
 * @param {*} input 
 * @returns 
 */
function customFormatter(input) {
    const res = [];

    for (const line of input) {
        const [info, test] = toStringAndSplitBy(line, "|");
        res.push([info, test]);
    }

    return res;
}

/**
 * 
 * @param {*} path 
 * @param {*} partOne 
 * @returns 
 */
 async function compute(path = resolve("./src/day_8/day_8.txt"), partOne = false) {
    let response = null;

    try {
        const formatters = [
            toStringAndSplitBy,
        ];
        const input = await readFile(path, formatters);
        const temp  = customFormatter(input);
        response = countUniqueValues(temp);

    } catch (ex) {
        console.error("Error occurred: ", ex);
    }

    return response;
}

module.exports = compute;
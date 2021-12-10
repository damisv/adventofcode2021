const { readFile, toStringAndSplitBy, toInteger, proxyFormatter } = require("../../utils");
const { resolve } = require("path");

function getUniqueLevelsAndExtremes(levels) {
    const uniqueLevels = {};

    let minLevel = Number.MAX_SAFE_INTEGER,
        maxLevel = Number.MIN_SAFE_INTEGER;

    for (const level of levels) {
        if (!uniqueLevels.hasOwnProperty(level)) {
            uniqueLevels[level] = 0;
        }
        uniqueLevels[level]++;
        minLevel = Math.min(minLevel, level);
        maxLevel = Math.max(maxLevel, level);
    }

    return {
        uniqueLevels,
        maxLevel,
        minLevel
    };
}

/**
 * 
 * @param {*} uniqueLevelsEntries 
 * @param {*} idx 
 * @param {*} currentMinFuel 
 * @returns 
 */
function getFuelNeededForIndex(uniqueLevelsEntries, idx, currentMinFuel = Number.MAX_SAFE_INTEGER) {
    let fuel = 0;

    for (const [key, value] of uniqueLevelsEntries) {
        fuel += Math.abs(key - idx) * value;
        if (fuel < currentMinFuel) continue;
        fuel = Number.MAX_SAFE_INTEGER;
        break;
    }

    return fuel;
}

/**
 * 
 * @param {*} input 
 */
function computeFuel(crabsLevels) {

    const { uniqueLevels, maxLevel, minLevel } = getUniqueLevelsAndExtremes(crabsLevels);
    
    let minFuel = Number.MAX_SAFE_INTEGER;
    const uniqueLevelsEntries = Object.entries(uniqueLevels).map((entry) => { return [parseInt(entry[0]), entry[1]]; });

    for (let i = minLevel; i <= maxLevel; i++) {
        const tempFuel = getFuelNeededForIndex(uniqueLevelsEntries, i, minFuel);
        minFuel = Math.min(tempFuel, minFuel);
    }

    return minFuel;
}

/**
 * 
 * @param {*} path 
 * @param {*} partOne 
 * @returns 
 */
 async function compute(path = resolve("./src/day_7/day_7.txt"), partOne = false) {
    let response = null;

    try {
        const formatters = [
            proxyFormatter(toStringAndSplitBy, ","),
            toInteger,
        ];
        const input = await readFile(path, formatters);
        response = computeFuel(input);

    } catch (ex) {
        console.error("Error occurred: ", ex);
    }

    return response;
}

module.exports = compute;
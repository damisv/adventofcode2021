const { readFile, toStringAndSplitBy, toInteger, proxyFormatter } = require("../../utils");
const { resolve } = require("path");

/**
 * Get count of horizontal levels, along with max and min levels
 * @param {*} levels 
 * @returns 
 */
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
 * Computes fuel needed for the given index
 * @param {*} uniqueLevelsEntries 
 * @param {*} idx 
 * @param {*} currentMinFuel 
 * @returns 
 */
function getFuelNeededForIndex(sumMap, uniqueLevelsEntries, idx, currentMinFuel, partOne) {
    let fuel = 0;

    for (const [key, value] of uniqueLevelsEntries) {
        if (partOne) {
            fuel += Math.abs(key - idx) * value;
        } else {
            fuel += sumMap[Math.abs(key - idx)] * value;
        }

        if (fuel < currentMinFuel) continue;
        fuel = Number.MAX_SAFE_INTEGER;
        break;
    }

    return fuel;
}

/**
 * Builds a map where each key is a number between 0 and the diff of maxLevel and minLevel;
 * This way the differences do not need to be recomputed everytime are needed.
 * I'm pretty sure that a math approach is available, but I couldn't remember it correctly :)
 * @param {*} minLevel 
 * @param {*} maxLevel 
 * @returns 
 */
function buildFuelSumMap(minLevel, maxLevel) {
    const sumMap = {};
    let idx = 0;
    let endIdx = maxLevel - minLevel;

    let sum = 0;
    while (idx < endIdx) {
        sum += idx * 1;
        sumMap[idx] = sum;
        idx++;
    }

    return sumMap;
}

/**
 * Compute minimum fuel level needed
 * @param {*} input 
 */
function computeFuel(crabsLevels, partOne) {

    const { uniqueLevels, maxLevel, minLevel } = getUniqueLevelsAndExtremes(crabsLevels);

    const sumMap = buildFuelSumMap(minLevel, maxLevel);
    
    let minFuel = Number.MAX_SAFE_INTEGER;
    const uniqueLevelsEntries = Object.entries(uniqueLevels).map((entry) => { return [parseInt(entry[0]), entry[1]]; });

    for (let i = minLevel; i <= maxLevel; i++) {
        const tempFuel = getFuelNeededForIndex(sumMap, uniqueLevelsEntries, i, minFuel, partOne);
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
        response = computeFuel(input, partOne);

    } catch (ex) {
        console.error("Error occurred: ", ex);
    }

    return response;
}

module.exports = compute;
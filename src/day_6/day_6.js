const { readFile, toStringAndSplitBy, toInteger, proxyFormatter } = require("../../utils");
const { resolve } = require("path");

/**
 * First version: Added a new fish every time one was reborn.
 * Second version (current): Instead of keeping track of fishes, keep track of their states & counter.
 *                          Given there are only 9 states available, one could just shift the array each day, adding the state=0 to state=6 an state=8.
 * @param {*} fishStates 
 * @param {*} days 
 * @returns {Number}
 */
function getCountOfLanternfish(fishStates, days) {
    const fishCounter = new Array(9).fill(0);

    // populate counter
    for (const fishState of fishStates) {
        fishCounter[fishState]++;
    }

    let day = 1;
    while (day <= days) {
        const reborn = fishCounter.shift();
        fishCounter[8] = reborn;
        fishCounter[6] += reborn;
        day++;
    }

    let sum = 0;
    for (const fish of fishCounter) {
        sum += fish;
    }

    return sum;
}

/**
 * 
 * @param {*} path 
 * @param {*} partOne 
 * @returns 
 */
 async function compute(path = resolve("./src/day_6/day_6.txt"), days = 256) {
    let response = null;

    try {
        const formatters = [
            proxyFormatter(toStringAndSplitBy, ","),
            toInteger,
        ];
        const fishStates = await readFile(path, formatters);

        response = getCountOfLanternfish(fishStates, days);
    } catch (ex) {
        console.error("Error occurred: ", ex);
    }

    return response;
}

module.exports = compute;
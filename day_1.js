const { readFile, toStringAndSplitBy, toInteger } = require("./utils");

/**
 * 
 * @param {*} arr 
 * @param {*} startIndex 
 * @param {*} endIndex
 * @param {*} previousSum : Sum of the previous window, in order to not compute it again
 * @returns {Number} Sum of the window requested
 */
function getWindowSum(input, startIndex, endIndex, previousSum = null) {
    if (!previousSum) {
        let sum = 0;
        let i = startIndex;
        while (i < endIndex) {
            sum += input[i];
            i++;
        }
        return sum;
    }
    return previousSum - input[startIndex - 1] + input[endIndex - 1];
}

/**
 * 
 * @param {*} input 
 * @param {*} windowSize 
 * @returns 
 */
function getNumberOfIncreasedWindows(input, windowSize) {
    let increases = 0;
    let previousSum = getWindowSum(input, 0, windowSize);

    for (let i = 1; i <= input.length - windowSize; i++) {
        const currentSum = getWindowSum(input, i, i + windowSize, previousSum);
        if (currentSum > previousSum) {
            increases++;
        }
        previousSum = currentSum;
    }
    return increases;
}

/**
 * 
 */
async function computeDay1() {
    try {
        const input = await readFile("./inputs/day_1.txt", [toStringAndSplitBy, toInteger]);

        const increases = getNumberOfIncreasedWindows(input, 3);

        console.log(increases);
    } catch (ex) {
        console.error("Error occurred: ", ex);
    }
}

computeDay1();
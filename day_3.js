const { readFile, toStringAndSplitBy } = require("./utils");

/**
 * 
 * @param {*} input 
 * @returns 
 */
function getOccurrencesPerIndex(input) {
    const occurrences = {};

    for (const str of input) {
        const bitsArray = str.split("");
        // go through every bit to find occurrences
        for (let i = 0; i < bitsArray.length; i++) {
            if (!occurrences.hasOwnProperty(i)) {
                occurrences[i] = { "0": 0, "1": 0 };
            }
            occurrences[i][bitsArray[i]]++;
        }
    }

    return occurrences;
}

/**
 * 
 * @param {*} input 
 * @returns { gamma: <Number>, epsilon: <Number> }
 */
function getGammaAndEpsilonRate(input) {
    const occurrences = getOccurrencesPerIndex(input);

    let gamma = "",
        epsilon = "";
    
    const noOfBitsPerNumber = input[0].length;
    for (let i = 0; i < noOfBitsPerNumber; i++) {
        const zeroCount = occurrences[i]["0"],
            oneCount = occurrences[i]["1"];

        let mostCommon = null,
            leastCommon = null;
        
        if (zeroCount > oneCount) {
            mostCommon = "0";
            leastCommon = "1";
        } else {
            mostCommon = "1";
            leastCommon = "0";
        }

        gamma += mostCommon;
        epsilon += leastCommon;
    }

    return {
        gamma: parseInt(gamma, 2),
        epsilon: parseInt(epsilon, 2)
    };
}

/**
 * 
 */
async function computeDay3(path = "./inputs/day_3.txt") {
    let response = null;

    try {
        const input = await readFile(path, [toStringAndSplitBy]);

        const { gamma, epsilon } = getGammaAndEpsilonRate(input);

        response = gamma * epsilon;

    } catch (ex) {
        console.error("Error occurred: ", ex);
    }

    return response;
}

module.exports = computeDay3;
const { readFile, toStringAndSplitBy } = require("../../utils");

/**
 * 
 * @param {*} input 
 * @returns 
 */
function getOccurrencesPerIndex(input, idx = null) {
    const occurrences = {};

    for (const str of input) {
        const bitsArray = str.split("");

        // check only for given index
        if (idx) {
            if (!occurrences.hasOwnProperty(idx)) {
                occurrences[idx] = { "0": 0, "1": 0 };
            }
            occurrences[idx][bitsArray[idx]]++;
            continue;
        }

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

function getMostAndLeastCommon(occurrences, index) {
    let mostCommon = null,
        leastCommon = null;

    const zeroCount = occurrences[index]["0"],
        oneCount = occurrences[index]["1"];

    if (zeroCount > oneCount) {
        mostCommon = "0";
        leastCommon = "1";
    } else {
        mostCommon = "1";
        leastCommon = "0";
    }

    return { mostCommon, leastCommon };
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
        const {mostCommon, leastCommon} = getMostAndLeastCommon(occurrences, i);

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
 * @param {*} input 
 */
function getLifeSupportRating(input) {
    // oxygen rating
    let oxygenGeneratorBinaryNumbers = [...input],
        oxygenScrubberRatingBinaryNumbers = [...input];

    let bitIdx = 0;
    
    // oxygen generator
    while (oxygenGeneratorBinaryNumbers.length > 1) {
        const temp = [];

        const occurrences = getOccurrencesPerIndex(oxygenGeneratorBinaryNumbers, bitIdx);
        const { mostCommon } = getMostAndLeastCommon(occurrences, bitIdx);

        for (const binaryNumber of oxygenGeneratorBinaryNumbers) {
            if (binaryNumber.charAt(bitIdx) !== mostCommon) continue;
            temp.push(binaryNumber);
        }

        oxygenGeneratorBinaryNumbers = temp;
        bitIdx++;
    }

    // co2 scrubber
    bitIdx = 0;
    while (oxygenScrubberRatingBinaryNumbers.length > 1) {
        const temp = [];

        const occurrences = getOccurrencesPerIndex(oxygenScrubberRatingBinaryNumbers, bitIdx);
        const { leastCommon } = getMostAndLeastCommon(occurrences, bitIdx);

        for (const binaryNumber of oxygenScrubberRatingBinaryNumbers) {
            if (binaryNumber.charAt(bitIdx) !== leastCommon) continue;
            temp.push(binaryNumber);
        }

        oxygenScrubberRatingBinaryNumbers = temp;
        bitIdx++;
    }

    return {
        oxygen_generator: parseInt(oxygenGeneratorBinaryNumbers[0], 2),
        co2_scrubber: parseInt(oxygenScrubberRatingBinaryNumbers[0], 2)
    }
}

/**
 * 
 * @param {*} path 
 * @param {*} partOne 
 * @returns 
 */
async function computeDay3(path = ".src/day_3/day_3.txt", partOne = false) {
    let response = null;

    try {
        const input = await readFile(path, [toStringAndSplitBy]);

        if (partOne) {
            const { gamma, epsilon } = getGammaAndEpsilonRate(input);
            response = gamma * epsilon;
        } else {
            const { oxygen_generator, co2_scrubber } = getLifeSupportRating(input);
            response = oxygen_generator * co2_scrubber;
        }
    } catch (ex) {
        console.error("Error occurred: ", ex);
    }

    return response;
}

module.exports = computeDay3;
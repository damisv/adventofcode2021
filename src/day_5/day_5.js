const { readFile, toStringAndSplitBy } = require("../../utils");
const { resolve } = require("path");

function inputFormatter(input) {
    const formatted = [];
    let maxX = Number.MIN_SAFE_INTEGER,
        maxY = Number.MIN_SAFE_INTEGER;

    for (const str of input) {
        const [start, end] = str.split("->");

        const coords = [];

        let [x1, y1] = start.trim().split(",");
        x1 = parseInt(x1);
        y1 = parseInt(y1);
        coords.push([x1, y1]);

        let [x2, y2] = end.trim().split(",");
        x2 = parseInt(x2);
        y2 = parseInt(y2);
        coords.push([x2, y2]);

        maxX = Math.max(maxX, x1, x2);
        maxY = Math.max(maxY, y1, y2);
        
        formatted.push(coords);
    }

    return {
        formatted,
        x: maxX,
        y: maxY
    };
}

function getComparatorsAndModifiers(num1, num2) {
    let comparator = null;
    let modifier = null
    if (num1 < num2) {
        comparator = (left, right) => left <= right;
        modifier = (num) => num + 1;
    } else {
        comparator = (left, right) => left >= right;
        modifier = (num) => num - 1;
    }

    return {modifier, comparator};
}

function markVentsAndCountOverlapping(matrix, x1, x2, y1, y2, diagonal = false) {
    let count = 0;

    if (diagonal) {
        let x = x1;
        let y = y1;

        const {comparator: xComparator, modifier: xModifier} = getComparatorsAndModifiers(x1, x2);
        const {comparator: yComparator, modifier: yModifier} = getComparatorsAndModifiers(y1, y2);

        while (xComparator(x, x2) && yComparator(y, y2)) {
            matrix[x][y]++;
            if (matrix[x][y] === 2) {
                count++;
            }
            x = xModifier(x);
            y = yModifier(y);
        }
    } else {
        const leftX = Math.min(x1, x2);
        const rightX = Math.max(x1, x2);

        const leftY = Math.min(y1, y2);
        const rightY = Math.max(y1, y2);
        for (let i = leftX; i < rightX + 1; i++) {
            for (let j = leftY; j < rightY + 1; j++) {
                matrix[i][j]++;
                if (matrix[i][j] === 2) {
                    count++;
                }
            }
        }
    }

    return count;
}

function computeNumberOfVentsToAvoid(input, partOne) {
    const {x, y, formatted: vents_coordinates} = input;

    const matrix = new Array(x + 1);
    let count = 0;
    while (count <= y) {
        matrix[count] = new Array(y + 1).fill(0);
        count++;
    }

    let vents = 0;

    for (const line of vents_coordinates) {
        const [[x1,y1], [x2, y2]] = line;

        // horizontal and vertical
        const isDiagonal = x1 !== x2 && y1 !== y2;

        if (partOne && isDiagonal) continue;

        const count = markVentsAndCountOverlapping(matrix, x1, x2, y1, y2, isDiagonal);
        vents += count;
    }

    return vents;
}

/**
 * 
 * @param {*} path 
 * @param {*} partOne 
 * @returns 
 */
 async function compute(path = resolve("./src/day_5/day_5.txt"), partOne = false) {
    let response = null;

    try {
        const formatters = [
            toStringAndSplitBy,
            inputFormatter
        ];
        const input = await readFile(path, formatters);

        response = computeNumberOfVentsToAvoid(input, partOne);
        
    } catch (ex) {
        console.error("Error occurred: ", ex);
    }

    return response;
}

module.exports = compute;
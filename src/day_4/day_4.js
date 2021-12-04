const { readFile, toStringAndSplitBy, toInteger, replaceChars } = require("../../utils");
const { resolve } = require("path");

/**
 * 
 * @param {*} input 
 * @returns 
 */
function customInputFormatter(input) {
    const inputStream = toInteger(toStringAndSplitBy(input[0], ","));

    const arrays = [];

    for (let i = 2; i < input.length; i += 6) {
        const temp = [];

        for (let j = 0; j < 5; j++) {
            let str = input[i + j].trim();
            str = replaceChars(str, /\s+/g, "_");
            str = toStringAndSplitBy(str, "_");
            temp.push(toInteger(str));
        }
        arrays.push(temp);
    }
    return {
        inputStream, arrays
    };
}


function computeScore(board, value) {
    let sum = 0;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] === -1) continue;
            sum += board[i][j];
        }
    }

    return sum * value;
}

function markAndCheckBoard(board, value) {
    let hasRowFinished = false;
    let hasColumnFinished = false;

    let columnsScore = {};
    let minColumnScore = 0;

    for (let i = 0; i < board.length; i++) {
        let rowFinished = 0;
        for (let j = 0; j < board[0].length; j++) {
            if (!columnsScore.hasOwnProperty(j)) columnsScore[j] = 0;
            if (board[i][j] !== value) {
                if (board[i][j] == -1) {
                    rowFinished++;
                    columnsScore[j] += -1;
                    minColumnScore = Math.min(minColumnScore, columnsScore[j]);
                }
                continue;
            }
            board[i][j] = -1;
            rowFinished++;
            columnsScore[j] += -1;
            minColumnScore = Math.min(minColumnScore, columnsScore[j]);
        }

        if (rowFinished === board[0].length) {
            hasRowFinished = true;
        }
        if (minColumnScore === -board.length) {
            hasColumnFinished = true;
        }
    }

    return hasRowFinished || hasColumnFinished;
}

function processBoard(num, board) {
    let foundWinner = false,
        score = null;

    const completedBoard = markAndCheckBoard(board, num);

    if (completedBoard) {
        foundWinner = true;
        score = computeScore(board, num);
    }

    return {
        foundWinner,
        score
    };
}

function getBingoWinnerScore(inputStream, boards, partOne) {
    let winningScore = null;

    const winnerBoards = {};

    for (const num of inputStream) {
        for (let i = 0; i < boards.length; i++) {
            if (winnerBoards.hasOwnProperty(i)) continue;
            const { foundWinner, score } = processBoard(num, boards[i]);
            if (!foundWinner || score === 0) continue;
            winningScore = score;
            winnerBoards[i] = true;
        }

        if (winningScore && partOne) break;
    }

    return winningScore;
}

/**
 * 
 * @param {*} path 
 * @param {*} partOne 
 * @returns 
 */
async function computeDay4(path = resolve("./src/day_4/day_4.txt"), partOne = false) {
    let response = null;

    try {
        const formatters = [
            toStringAndSplitBy,
            customInputFormatter,
        ];
        const { inputStream, arrays: boards } = await readFile(path, formatters);
        
        response = getBingoWinnerScore(inputStream, boards, partOne);

    } catch (ex) {
        console.error("Error occurred: ", ex);
    }

    return response;
}

module.exports = computeDay4;
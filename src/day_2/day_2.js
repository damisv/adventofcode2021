const { readFile, toStringAndSplitBy } = require("../../utils");
const { resolve } = require("path");

function getHorizontalDepthAndAim(input, partOne = false) {
    let horizontal = 0,
        depth = 0,
        aim = 0;
    for (const str of input) {
        let [command, value] = str.split(" ");

        value = parseInt(value);
        switch (command) {
            case "forward":
                horizontal += value;

                if (!partOne && aim > 0) {
                    depth += aim * value;
                }
                break;
            case "up":
                aim -= value;
                partOne && (depth -= value);
                break;
            case "down":
                aim += value;
                partOne && (depth += value);
                break;
            default:
                console.error("unknown_command");
                break;
        };
    }
    return {
        horizontal,
        depth,
        aim
    };
}
/**
 * 
 */
async function computeDay2(path = resolve(".src/day_2/day_2.txt"), partOne = false) {
    let horizontal, depth, aim = null;
    try {
        const input = await readFile(path, [toStringAndSplitBy]);

        ({horizontal, depth, aim} = getHorizontalDepthAndAim(input, partOne));

    } catch (ex) {
        console.error("Error occurred: ", ex);
    }

    return horizontal * depth;
}

module.exports = computeDay2;
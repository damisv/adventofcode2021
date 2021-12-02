const { readFile, toStringAndSplitBy, toInteger } = require("./utils");

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
async function computeDay2() {
    try {
        const input = await readFile("./inputs/day_2.txt", [toStringAndSplitBy]);

        const {horizontal, depth, aim} = getHorizontalDepthAndAim(input);

        console.log(horizontal * depth);
    } catch (ex) {
        console.error("Error occurred: ", ex);
    }
}

computeDay2();
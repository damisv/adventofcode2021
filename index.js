const formatters = {
    day: parseInt,
    testinput: (input) => input.toLowerCase() === "true",
    windowssize: parseInt,
    partone: (input) => input.toLowerCase() === "true",
};

function exit(error) {
    console.error(error.toString());
    process.exit(1);
}

async function run() {
    let args = process.argv;
    
    let day = null;
    let testInput = false;
    const arguments = [];

    for (const arg of args) {
        const temp = arg.replace(/-+/g, "");
        let [param, value] = temp.split("=");
        param = param.toLowerCase();
        if (!formatters.hasOwnProperty(param)) continue;
        value = formatters[param](value);
        if (param === "day") {
            day = value;
        } else if (param === "testinput") {
            testInput = value;
        } else {
            arguments.push(value);
        }
    }

    if (!day) {
        exit(new Error("--day Param is required!"));
    }

    const path = `./src/day_${day}/day_${day}`;
    const computeDay = require(path);

    let inputPath = `${path}.txt`;
    if (testInput) {
        inputPath = `./test/test_input/day_${day}.txt`;
    }

    const res = await computeDay(inputPath, ...arguments);
    console.log(res);
}

run();
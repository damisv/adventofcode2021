const formatters = {
    day: parseInt,
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
    const arguments = [];

    for (const arg of args) {
        const temp = arg.replace(/-+/g, "");
        let [param, value] = temp.split("=");
        if (!formatters.hasOwnProperty(param.toLowerCase())) continue;
        value = formatters[param.toLowerCase()](value);
        if (param === "day") {
            day = value;
        } else {
            arguments.push(value);
        }
    }

    if (!day) {
        exit(new Error("--day Param is required!"));
    }

    const path = `./src/day_${day}/day_${day}`;
    const computeDay = require(path);

    console.log(arguments);
    const res = await computeDay(`${path}.txt`, ...arguments);
    console.log(res);
}

run();
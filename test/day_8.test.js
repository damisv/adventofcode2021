const assert = require("assert");

const sinon = require("sinon"),
    path = "./test/test_input/day_8.txt",
    path_to_personal_input = "./src/day_8/day_8.txt",
    computeDay = require("../src/day_8/day_8");

describe("unit_tests day_8", () => {

    const sandbox = sinon.createSandbox();

    beforeEach(sandbox.reset);

    it("Should return 26", async () => {
        const expectedResult = 26;

        let res = null;

        try {
            res = await computeDay(path, true);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

    it("Should return 504 - personal input", async () => {
        const expectedResult = 504;

        let res = null;

        try {
            res = await computeDay(path_to_personal_input, true);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

});
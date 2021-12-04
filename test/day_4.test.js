const assert = require("assert");

const sinon = require("sinon"),
    path = "./test/test_input/day_4.txt",
    path_to_personal_input = "./src/day_4/day_4.txt",
    computeDay4 = require("../src/day_4/day_4");

describe("unit_tests day_4", () => {

    const sandbox = sinon.createSandbox();

    beforeEach(sandbox.reset);

    it("Should return 4512", async () => {
        const expectedResult = 4512;

        let res = null;

        try {
            res = await computeDay4(path, true);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

    it("Should return 25023 - personal_input", async () => {
        const expectedResult = 25023;

        let res = null;

        try {
            res = await computeDay4(path_to_personal_input, true);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

    it("Should return 1924", async () => {
        const expectedResult = 1924;

        let res = null;

        try {
            res = await computeDay4(path, false);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

    it("Should return 2634 - personal_input", async () => {
        const expectedResult = 2634;

        let res = null;

        try {
            res = await computeDay4(path_to_personal_input, false);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });
});
const assert = require("assert");

const sinon = require("sinon"),
    path = "./test/test_input/day_7.txt",
    path_to_personal_input = "./src/day_7/day_7.txt",
    computeDay = require("../src/day_7/day_7");

describe("unit_tests day_7", () => {

    const sandbox = sinon.createSandbox();

    beforeEach(sandbox.reset);

    it("Should return 37", async () => {
        const expectedResult = 37;

        let res = null;

        try {
            res = await computeDay(path, true);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

    it("Should return 352331 - personal input", async () => {
        const expectedResult = 352331;

        let res = null;

        try {
            res = await computeDay(path_to_personal_input, true);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

    it("Should return 168", async () => {
        const expectedResult = 168;

        let res = null;

        try {
            res = await computeDay(path, false);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

    it("Should return 99266250 - personal input", async () => {
        const expectedResult = 99266250;

        let res = null;

        try {
            res = await computeDay(path_to_personal_input, false);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

});
const assert = require("assert");

const sinon = require("sinon"),
    path = "./test/test_input/day_5.txt",
    path_to_personal_input = "./src/day_5/day_5.txt",
    computeDay = require("../src/day_5/day_5");

describe("unit_tests day_4", () => {

    const sandbox = sinon.createSandbox();

    beforeEach(sandbox.reset);

    it("Should return 5", async () => {
        const expectedResult = 5;

        let res = null;

        try {
            res = await computeDay(path, true);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

    it("Should return 8622 - personal_input", async () => {
        const expectedResult = 8622;

        let res = null;

        try {
            res = await computeDay(path_to_personal_input, true);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

    it("Should return 12", async () => {
        const expectedResult = 12;

        let res = null;

        try {
            res = await computeDay(path, false);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

    it("Should return 22037 - personal_input", async () => {
        const expectedResult = 22037;

        let res = null;

        try {
            res = await computeDay(path_to_personal_input, false);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });
});
const assert = require("assert");

const sinon = require("sinon"),
    path = "./test/test_input/day_6.txt",
    path_to_personal_input = "./src/day_6/day_6.txt",
    computeDay = require("../src/day_6/day_6");

describe("unit_tests day_6", () => {

    const sandbox = sinon.createSandbox();

    beforeEach(sandbox.reset);

    it("Should return 26 - 18 days", async () => {
        const expectedResult = 26;

        let res = null;

        try {
            res = await computeDay(path, 18);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

    it("Should return 5934 - 80 days", async () => {
        const expectedResult = 5934;

        let res = null;

        try {
            res = await computeDay(path, 80);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

    it("Should return 26984457539 - 256 days", async () => {
        const expectedResult = 26984457539;

        let res = null;

        try {
            res = await computeDay(path, 256);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

    it("Should return 1638 - 18 days - personal_input", async () => {
        const expectedResult = 1638;

        let res = null;

        try {
            res = await computeDay(path_to_personal_input, 18);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

    it("Should return 362740 - 80 days - personal_input", async () => {
        const expectedResult = 362740;

        let res = null;

        try {
            res = await computeDay(path_to_personal_input, 80);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

    it("Should return 1644874076764 - 256 days - personal_input", async () => {
        const expectedResult = 1644874076764;

        let res = null;

        try {
            res = await computeDay(path_to_personal_input, 256);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

});
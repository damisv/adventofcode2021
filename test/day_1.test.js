const assert = require("assert");

const sinon = require("sinon"),
    path = "./test_input/day_1.txt",
    path_to_personal_input = "./inputs/day_1.txt",
    computeDay1 = require("../day_1");

describe("unit_tests day_1", () => {

    const sandbox = sinon.createSandbox();

    beforeEach(sandbox.reset);

    it("Should return 7 for windows size = 1", async () => {
        const expectedResult = 7;

        let res = null;

        try {
            res = await computeDay1(path, 1);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

    it("Should return 1548 for windows size = 1 - personal_input", async () => {
        const expectedResult = 1548;

        let res = null;

        try {
            res = await computeDay1(path_to_personal_input, 1);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

    it("Should return 5 for windows size = 3", async () => {
        const expectedResult = 5;

        let res = null;

        try {
            res = await computeDay1(path, 3);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

    it("Should return 1589 for windows size = 3 - personal_input", async () => {
        const expectedResult = 1589;

        let res = null;

        try {
            res = await computeDay1(path_to_personal_input, 3);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

});
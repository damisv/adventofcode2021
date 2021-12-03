const assert = require("assert");

const sinon = require("sinon"),
    path = "./test/test_input/day_3.txt",
    path_to_personal_input = "./src/day_3/day_3.txt",
    computeDay3 = require("../src/day_3/day_3");

describe("unit_tests day_3", () => {

    const sandbox = sinon.createSandbox();

    beforeEach(sandbox.reset);

    it("Should return 198", async () => {
        const expectedResult = 198;

        let res = null;

        try {
            res = await computeDay3(path, true);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

    it("Should return 3885894 - personal_input", async () => {
        const expectedResult = 3885894;

        let res = null;

        try {
            res = await computeDay3(path_to_personal_input, true);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

    it("Should return 230", async () => {
        const expectedResult = 230;

        let res = null;

        try {
            res = await computeDay3(path, false);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

    it("Should return 4375225 - personal_input", async () => {
        const expectedResult = 4375225;

        let res = null;

        try {
            res = await computeDay3(path_to_personal_input, false);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

});
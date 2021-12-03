const assert = require("assert");

const sinon = require("sinon"),
    path = "./test_input/day_3.txt",
    computeDay3 = require("../day_3");

describe("unit_tests day_3", () => {

    const sandbox = sinon.createSandbox();

    beforeEach(sandbox.reset);

    it("Should return 198", async () => {
        const expectedResult = 198;

        let res = null;

        try {
            res = await computeDay3(path);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

});
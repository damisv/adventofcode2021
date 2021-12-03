const assert = require("assert");

const sinon = require("sinon"),
    path = "./test_input/day_2.txt",
    path_to_personal_input = "./inputs/day_2.txt",
    computeDay2 = require("../day_2");

describe("unit_tests day_2", () => {

    const sandbox = sinon.createSandbox();

    beforeEach(sandbox.reset);

    it("Should return 150 for partOne without aim", async () => {
        const expectedResult = 150;

        let res = null;

        try {
            res = await computeDay2(path, true);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

    it("Should return 1990000 for partOne without aim - personal_input", async () => {
        const expectedResult = 1990000;

        let res = null;

        try {
            res = await computeDay2(path_to_personal_input, true);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

    it("Should return 900 for partTwo with aim", async () => {
        const expectedResult = 900;

        let res = null;

        try {
            res = await computeDay2(path);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

    it("Should return 1975421260 for partTwo with aim - personal_input", async () => {
        const expectedResult = 1975421260;

        let res = null;

        try {
            res = await computeDay2(path_to_personal_input);
        } catch (ex) {
            assert.fail();
        }

        sinon.assert.match(res, expectedResult);
    });

});
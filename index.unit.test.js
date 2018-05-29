const testHelpers = require('@quoin/node-test-helpers');

const moduleToTest = require('./index');

const expect = testHelpers.expect;

describe("index.js", () => {
    it("should expose a function with 4 params", () => {
        expect(moduleToTest).to.be.a('function');
        expect(moduleToTest).to.have.lengthOf(4);
    });

    describe("calling function", () => {
        let returnValue;

        before(() => {
            returnValue = moduleToTest(1, 2, {}, () => {});
        });

        it("should return an object", () => {
            expect(returnValue).to.be.an('object');
        });

        it("should have 'httpServer'", () => {
            expect(returnValue).to.have.property('httpServer');
        });

        it("should have 'httpsServer'", () => {
            expect(returnValue).to.have.property('httpsServer');
        });
    });
});

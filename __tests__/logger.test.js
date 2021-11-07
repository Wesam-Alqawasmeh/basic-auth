"use strict";

const loggerMiddleware = require('../src/middlewares/logger');


describe('logger middle ware handle', () => {

    let consoleSpy;
    let res = {};
    let req = {};
    let next = jest.fn();


    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    })

    test('if it loges output', async() => {
        await loggerMiddleware(req, res, next);
        expect(consoleSpy).toHaveBeenCalled();
    });

    test('if it move to the next line', async() => {
        await loggerMiddleware(req, res, next);
        expect(next).toHaveBeenCalled();
    });

})
'use strict';
/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */

/**
 * Stack
 */
const { expect } = require('chai');
const stack = require('./../../lib/stack');

describe('#stack', function () {

    it('returns object with following properties: middlewares, routes, exceptions', function () {
        expect(stack).to.have.all.keys('middlewares', 'routes', 'exceptions');
        expect(stack.middlewares).to.be.an('array');
        expect(stack.routes).to.be.an('array');
        expect(stack.exceptions).to.be.an('array');
    });

    it('should not extensible', function () {
        try {
            stack.test = 1;
            expect(stack).to.not.have.property('test');
        } catch (err) {
            expect(err).to.be.an('error');
        }
    });

});
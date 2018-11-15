'use strict';
/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */

/**
 * Route
 */
const { expect } = require('chai');
const route = require('./../../lib/route');
const stack = require('./../../lib/stack');

describe('#route', function () {

    it('returns route object', function () {
        expect(route).to.be.an('object');
    });

    it('should not extensible', function () {
        try {
            route.test = 1;
            expect(route).to.not.have.property('test');
        } catch (err) {
            expect(err).to.be.an('error');
        }
    });

    it('should provide use method for middlewares', function () {
        let task = function () { };
        expect(route).to.have.property('use');

        route.use(task);
        expect(stack.middlewares.length).to.equal(3);
        expect(stack.middlewares.pop()).to.eql({ task });

        try {
            route.use('task');
        } catch (e) {
            expect(e).to.be.an.instanceof(TypeError);
            expect(e.message).to.equal('Route.use() requires a middleware function');
        }

    });

    it('should provide use method for middlewares', function () {
        let task = function () { };
        expect(route).to.have.property('use');

        route.use(task);
        expect(stack.middlewares.length).to.equal(3);
        expect(stack.middlewares.pop()).to.eql({ task });

        try {
            route.use('task');
        } catch (e) {
            expect(e).to.be.an.instanceof(TypeError);
            expect(e.message).to.equal('Route.use() requires a middleware function');
        }

    });

    it('should provide use method for middlewares', function () {
        let task = function () { };
        expect(route).to.have.property('use');

        route.use(task);
        expect(stack.middlewares.length).to.equal(3);
        expect(stack.middlewares.pop()).to.eql({ task });

        try {
            route.use('task');
        } catch (e) {
            expect(e).to.be.an.instanceof(TypeError);
            expect(e.message).to.equal('Route.use() requires a middleware function');
        }

    });

});
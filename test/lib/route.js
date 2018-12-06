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

    it('should provide all http methods', function () {
        expect(route).to.have.property('all');
        expect(route).to.have.property('get');
        expect(route).to.have.property('post');
        expect(route).to.have.property('put');
        expect(route).to.have.property('delete');
        expect(route).to.have.property('options'); 
    });

    it('should provide all http methods for every method for a specific route', function () {
        let task = function () { };
        expect(route).to.have.property('all');

        route.all('/', task);
        expect(stack.routes.length).to.equal(1);
        expect(stack.routes.pop()).to.eql({ 'method': 'ALL', 'path': '/', 'pattern': /^\/?$/i, task });

        try {
            route.all(task);
        } catch (e) {
            expect(e).to.be.an.instanceof(TypeError);
            expect(e.message).to.equal('First argument requires a string');
        }

        try {
            route.all('/');
        } catch (e) {
            expect(e).to.be.an.instanceof(TypeError);
            expect(e.message).to.equal('Route.all() requires a callback function but got a undefined');
        }

    });

    it('should provide for method to extend route with prefix url', function () {
        expect(route).to.have.property('for');

        let blog = route.for('/blog');
        expect(stack.routes.length).to.equal(0);
        expect(blog).to.have.property('use');

        blog.use(function(){})
        expect(stack.routes.length).to.equal(1);
        expect(stack.routes[0].method).to.equal('ALL');
        expect(stack.routes[0].path).to.equal('/blog/*');
        expect(stack.routes[0].pattern.test('/blog/test')).to.equal(true);
        expect(stack.routes[0].pattern.test('/blog')).to.equal(true);
        expect(stack.routes[0].task).to.be.a('function');

        try {
            route.for();
        } catch (e) {
            expect(e).to.be.an.instanceof(TypeError);
            expect(e.message).to.equal('URL prefix should be a string');
        }

        try {
            route.for(1);
        } catch (e) {
            expect(e).to.be.an.instanceof(TypeError);
            expect(e.message).to.equal('URL prefix should be a string');
        }

    });

    it('should provide error method to handle exceptions/errors', function () {
        let task = function () { };
        expect(route).to.have.property('error');

        route.error(task);
        expect(stack.exceptions.length).to.equal(1);
        expect(stack.exceptions.pop()).to.eql({ task });
        
        route.error('NOT_FOUND', task);
        expect(stack.exceptions.length).to.equal(1);
        expect(stack.exceptions[0].code).to.equal('NOT_FOUND');
        expect(stack.exceptions[0].task).to.equal(task);

        try {
            route.error('task');
        } catch (e) {
            expect(e).to.be.an.instanceof(TypeError);
            expect(e.message).to.equal('Route.error() requires a callback function');
        }

        try {
            route.error(404, task);
        } catch (e) {
            expect(e).to.be.an.instanceof(TypeError);
            expect(e.message).to.equal('Error code should be a string');
        }

    });

});
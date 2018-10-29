'use strict';
/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */

/**
 * Stack
 * Store all middlewares, routes and exceptions
 */
const { expect } = require('chai');
const api = require('./../api');

describe('REST API Framework', function () {
    describe('#api', function () {

        it('returns object with following properties: app, route, server', function () {
            expect(api).to.have.property('app');
            expect(api).to.have.property('route');
            expect(api).to.have.property('server');
        });

        it('should not extensible', function () {
            try {
                api.test = 1;
                expect(err).to.not.have.property('test');
            } catch (err) {
                expect(err).to.be.an('error');
            }
        });
    });
});
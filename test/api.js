'use strict';
/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */

/**
 * REST API Framework
 * Unit test cases
 */
const { use, expect } = require('chai');
const api = require('./../api');
const spies = require('chai-spies');

use(spies);

describe('REST API Framework', function () {
    describe('#api', function () {

        it('returns object with following properties: app, route, server', function () {
            expect(api).to.have.all.keys('app', 'route', 'server');
        });

        it('should not extensible', function () {
            try {
                api.test = 1;
                expect(api).to.not.have.property('test');
            } catch (err) {
                expect(err).to.be.an('error');
            }
        });
    });

    // lib
    require('./lib/stack');
    require('./lib/server');
    require('./lib/application');
    require('./lib/route');
});
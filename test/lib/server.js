'use strict';
/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */

/**
 * Server
 */
const {expect} = require('chai');
const server = require('./../../lib/server');
const EventEmitter = require('events');

describe('#server', function () {

    it('returns server object', function () {
        expect(server).to.be.an.instanceof(EventEmitter);
    });

    it('should have listen property', function () {
        expect(server).to.have.property('listen');
        expect(server.listen).to.be.an('function');
    });

});
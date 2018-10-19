'use strict';
/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
const app = require('./lib/application');
const route = require('./lib/route');
const server = require('./lib/server');

/**
 * Expose API
 */
const API = function () {
    return Object.freeze({
        app,
        route,
        server
    });
};

module.exports = API();
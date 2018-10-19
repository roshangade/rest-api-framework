'use strict';
/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
const route = require('./route');
const { middlewares } = require('./../utils');
const { request, response } = middlewares;

/**
 * Application
 */
const Application = function () {
    const config = {};

    // load default middlewares
    route.use(request);
    route.use(response);

    return Object.freeze({
        set: (key, value) => {
            config[key] = value;
        },

        get: (key) => {
            try {
                return key.split(':').reduce((val, key) => val[key], config);
            } catch (e) { }
            return undefined;
        }
    });

};

module.exports = Application();
'use strict';
/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
const { middlewares, routes, exceptions } = require('./stack');
const { url, METHODS } = require('./../utils');

/**
 * Router
 */
const Routes = function () {
    return Object.freeze({
        use: Middleware,
        error: Exception,
        for: ExtendedRouter,
        ...Router()
    });
};

const Middleware = function (task) {
    if (typeof task !== 'function') {
        throw new TypeError('Route.use() requires a middleware function');
    }

    middlewares.push({ task });
};

const Router = function (prefix) {
    let funcs = {};
    (['ALL', ...METHODS]).forEach(method => {
        funcs[method.toLowerCase()] = function (path, task) {

            if (typeof path !== 'string') {
                throw new TypeError('First argument requires a string');
            }

            if (typeof task !== 'function') {
                throw new TypeError('Route.' + method.toLowerCase() + '() requires a callback function but got a ' + task);
            }

            path = (prefix || '') + path;
            routes.push({
                method,
                path,
                ...url.compile(path),
                task
            });
        };
    });

    return funcs;
};

const ExtendedRouter = function (prefix) {
    if (typeof prefix !== 'string') {
        throw new TypeError('URL prefix should be a string');
    }

    let ctx = (typeof this.prefix !== 'undefined') ? this : {};
    ctx.prefix = prefix = (ctx.prefix || '') + '/' + prefix.replace(/(^\/)|(\/$)/g, "");
    
    return Object.freeze({
        ...Router(prefix),
        use: function (task) {
            return this.all('/*', task);
        },
        error: Exception,
        for: ExtendedRouter.bind(ctx)
    });
};

const Exception = function (code, task) {
    let handle = { code, task };

    if (arguments.length === 2 && typeof code !== 'string') {
        throw new TypeError('Error code should be a string');
    }

    if (arguments.length === 1) {
        task = code;
        handle = { task };
    }

    if (typeof task !== 'function') {
        throw new TypeError('Route.error() requires a callback function');
    }

    exceptions.push(handle);
};

module.exports = Routes();
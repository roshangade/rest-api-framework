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
    //TODO: validate task
    middlewares.push({ task });
};

const Exception = function (code, task) {
    //TODO: validate code and task
    let handle = (typeof code === 'function') ? { task: code } : { code, task };
    exceptions.push(handle);
}

const Router = function (prefix) {
    let funcs = {};
    (['ALL', ...METHODS]).forEach(method => {
        funcs[method.toLowerCase()] = function (path, task) {
            route(method, (prefix || '') + path, task);
        };
    });
    return Object.assign({}, funcs);
};

const route = function (method, path, task) {
    routes.push({
        method,
        path,
        ...url.compile(path),
        task
    });
};

const ExtendedRouter = function (prefix) {
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

module.exports = Routes();
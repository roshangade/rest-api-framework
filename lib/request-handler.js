'use strict';
/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
const { url } = require('./../utils');
const { middlewares, routes, exceptions } = require('./stack');

/**
 * Request Handler
 */
const RequestHandler = function () {
    return Object.freeze({
        execute
    });
};

const execute = function (req, res) {
    let ctx = {};
    return Promise.resolve()
        .then(() => {
            return Middlewares.call(ctx, req, res);
        })
        .then(() => {
            return Routers.call(ctx, req, res);
        })
        .catch(err => {
            return Exceptions.call(ctx, err, req, res);
        })
        .catch(err => {
            ErrorHandler.call(ctx, err, req, res);
        });
};

module.exports = RequestHandler();

// ================== Handler functions ================== //

const Middlewares = async function (req, res) {
    let ctx = this;
    for (let i = 0, count = middlewares.length; i < count; i++) {
        if (res.finished) break;
        await (middlewares[i]).task.call(ctx, req, res);
    }
};

const Routers = async function (req, res) {
    let ctx = this;
    let path = req._url.pathname;
    let method = req.method.toUpperCase();
    for (let i = 0, count = routes.length; i < count; i++) {
        if (res.finished) break;
        let route = routes[i];
        if ((route.method === method || route.method === 'ALL') && route.pattern.test(path)) {
            (route.keys) && (req.params = url.parseParams(path, route.keys, route.pattern));
            await route.task.call(ctx, req, res);
        }
    }
    if (!res.finished) throw { code: "NOT_FOUND" };
};

const Exceptions = async function (err, req, res) {
    let ctx = this;
    for (let i = 0, count = exceptions.length; i < count; i++) {
        if (res.finished) break;
        let exception = exceptions[i];
        if ((exception.code && exception.code === err.code) || (!exception.code && !err.code)) {
            await exception.task.call(ctx, err, req, res);
        }
    }
    if (!res.finished) throw { code: err.code || 'UNCAUGHT_ERROR', error: err.error || err };
};

const ErrorHandler = function (err, req, res) {
    if (err.code === 'NOT_FOUND') {
        return res.status(404).send({ message: 'URL does not extists' });
    }
    console.error(err);
    res.statusCode = 500;
    res.setHeader('content-type', 'application/json');
    res.end('{ "message": "Internal server error" }')
};
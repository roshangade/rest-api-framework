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

    /**
     * Execute all middlewares for every request
     */
    const Middlewares = async function (req, res) {
        for (let i = 0, count = middlewares.length; i < count; i++) {
            if (res.finished) break;
            await (middlewares[i]).task(req, res);
        }
    };

    /**
     * Map every request with all routers and execute the function
     */
    const Routers = async function (req, res) {
        let path = req._url.pathname;
        let method = req.method.toUpperCase();
        for (let i = 0, count = routes.length; i < count; i++) {
            if (res.finished) break;
            let route = routes[i];
            if ((route.method === method || route.method === 'ALL') && route.pattern.test(path)) {
                (route.keys) && (req.params = url.parseParams(path, route.keys, route.pattern));
                await route.task(req, res);
            }
        }
        if (!res.finished) throw { code: "NOT_FOUND" };
    };

    /**
     * If encounter any error while processing any request, then execute error handler function 
     */
    const Exceptions = async function (err, req, res) {
        for (let i = 0, count = exceptions.length; i < count; i++) {
            if (res.finished) break;
            let exception = exceptions[i];
            if ((exception.code && exception.code === err.code) || (!exception.code && !err.code)) {
                await exception.task(err, req, res);
            }
        }
        if (!res.finished) throw { code: err.code || 'UNCAUGHT_ERROR', error: err.error || err };
    };

    /**
     * Uncaught error handler
     */
    const ErrorHandler = function (err, req, res) {
        if (err.code === 'NOT_FOUND') {
            return res.status(404).send({ message: 'URL does not extists' });
        }
        console.log('eeeeeee')
        console.error(err);
        res.statusCode = 500;
        res.setHeader('content-type', 'application/json');
        res.end('{ "message": "Internal server error" }')
    };

    return Object.freeze({

        /**
         * Execute request throughout pipeline 
         */
        async execute (req, res) {
            try {
                await Middlewares(req, res);
                await Routers(req, res);
            } catch (err) {
                try {
                    await Exceptions(err, req, res);
                } catch (err) {
                    await ErrorHandler(err, req, res);
                }
            }
        }
    });
};

module.exports = RequestHandler();
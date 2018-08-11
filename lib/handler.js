/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
const stack = require('./stack');
const { url } = require('./../utils');

const interceptors = async (req, res) => {
    try {
        let interceptors = stack.interceptors || [];
        for (let i = 0, count = interceptors.length; i < count; i++) {
            if (res.finished) break;
            let interceptor = interceptors[i];
            await interceptor.task(req, res);
        }
    } catch (error) {
        return Promise.reject(error);
    }
    return Promise.resolve();
};

const routers = async (req, res) => {
    try {
        let routes = stack.routes || [];
        for (let i = 0, count = routes.length; i < count; i++) {
            if (res.finished) break;
            let route = routes[i];
            // check method and test url pattern
            if ((route.method === req.method || route.method === 'ALL') && route.pattern.test(req._url.pathname)) {
                (route.keys) && (req.params = url.params(req._url.pathname, route.keys, route.pattern));
                await route.task(req, res);
            }
        }
    } catch (error) {
        return Promise.reject(error);
    }

    // Check
    if (!res.finished) return Promise.reject({ code: 'URL_NOT_FOUND' });
    return Promise.resolve();
};

const exceptions = async (err, req, res) => {
    try {
        let exceptions = stack.exceptions || [];
        for (let i = 0, count = exceptions.length; i < count; i++) {
            if (res.finished) break;
            let exception = exceptions[i];
            // check method and test url pattern
            if (/*(exception.method === req.method || exception.method === 'ALL') && */ ((exception.code && exception.code === err.code) || (!exception.code && !err.code)) /* && exception.pattern.test(req._url.pathname) */) {
                //(exception.keys) && (req.params = url.params(req._url.pathname, exception.keys, exception.pattern));
                await exception.task(err, req, res);
            }
        }
    } catch (err) {
        return Promise.reject(err);
    }
    if (!res.finished) return Promise.reject(err);
};

const handler = (req, res) => {
    return Promise.resolve()
        .then(() => {
            return interceptors(req, res);
        })
        .then(() => {
            return routers(req, res);
        })
        .catch((err) => {
            return exceptions(err, req, res);
        })
        .catch(err => {
            let message = 'Internal servere error.';
            let status = 500;
            if (err.code === 'URL_NOT_FOUND') {
                message = 'URL does not extists.'
                status = 404;
            } else {
                console.error(err);
            }
            res.status(status).end({ message });
        });
};

module.exports = handler;
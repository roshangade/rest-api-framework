"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stack_1 = __importDefault(require("./stack"));
const url_1 = __importDefault(require("./../utils/url"));
/**
 * Run middlewares
 */
const interceptors = async (req, res) => {
    try {
        let interceptors = stack_1.default.interceptors || [];
        for (let i = 0, count = interceptors.length; i < count; i++) {
            if (res.finished)
                break;
            let interceptor = interceptors[i];
            await interceptor.task(req, res);
        }
    }
    catch (error) {
        return Promise.reject(error);
    }
    return Promise.resolve();
};
/**
 * Check routes and run matched routes
 */
const routers = async (req, res) => {
    try {
        let routes = stack_1.default.routes || [];
        for (let i = 0, count = routes.length; i < count; i++) {
            if (res.finished)
                break;
            let route = routes[i];
            // check method and test url pattern
            if ((route.method === req.method || route.method === 'ALL') && route.pattern.test(req._url.pathname)) {
                (route.keys) && (req._params = url_1.default.params(req._url.pathname, route.keys, route.pattern));
                await route.task(req, res);
            }
        }
    }
    catch (error) {
        return Promise.reject(error);
    }
    // Check
    if (!res.finished)
        return Promise.reject({ code: 'URL_NOT_FOUND' });
    return Promise.resolve();
};
/**
 * Run if exeption found
 */
const exceptions = async (err, req, res) => {
    try {
        let exceptions = stack_1.default.exceptions || [];
        for (let i = 0, count = exceptions.length; i < count; i++) {
            if (res.finished)
                break;
            let exception = exceptions[i];
            // check method and test url pattern
            if ( /*(exception.method === req.method || exception.method === 'ALL') && */((exception.code && exception.code === err.code) || (!exception.code && !err.code)) /* && exception.pattern.test(req._url.pathname) */) {
                //(exception.keys) && (req.params = url.params(req._url.pathname, exception.keys, exception.pattern));
                await exception.task(err, req, res);
            }
        }
    }
    catch (err) {
        return Promise.reject(err);
    }
    if (!res.finished)
        return Promise.reject(err);
};
/**
 * Promise - Request handler
 */
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
            message = 'URL does not extists.';
            status = 404;
        }
        else {
            console.error(err);
        }
        res.status(status).end({ message });
    });
};
exports.default = handler;

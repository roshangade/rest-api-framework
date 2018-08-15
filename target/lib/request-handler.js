"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const url_1 = __importDefault(require("../utils/url"));
const stack_1 = __importDefault(require("./stack"));
/**
 * Request Handler
 */
class RequestHandler {
    static async interceptors(req, res) {
        try {
            let middlewares = stack_1.default.middlewares;
            for (let i = 0, count = middlewares.length; i < count; i++) {
                if (res.finished)
                    break;
                await (middlewares[i]).task(req, res);
            }
        }
        catch (error) {
            return Promise.reject(error);
        }
        return Promise.resolve();
    }
    ;
    static async routers(path, method, req, res) {
        try {
            let routes = stack_1.default.routes;
            for (let i = 0, count = routes.length; i < count; i++) {
                if (res.finished)
                    break;
                let route = routes[i];
                if ((route.method === method || route.method === 'ALL') && route.pattern.test(path)) {
                    (route.keys) && (req.params = url_1.default.parseParams(path, route.keys, route.pattern));
                    await route.task(req, res);
                }
            }
            if (!res.finished)
                throw { code: "NOT_FOUND" };
        }
        catch (error) {
            return Promise.reject(error);
        }
        return Promise.resolve();
    }
    static async exceptions(err, req, res) {
        try {
            let exceptions = stack_1.default.exceptions;
            for (let i = 0, count = exceptions.length; i < count; i++) {
                if (res.finished)
                    break;
                let exception = exceptions[i];
                if ((exception.code && exception.code === err.code) || (!exception.code && !err.code)) {
                    await exception.task(err, req, res);
                }
            }
            if (!res.finished)
                throw { code: err.code || 'UNCAUGHT_ERROR', error: err.error || err };
        }
        catch (err) {
            return Promise.reject({ code: err.code || 'INTERNAL_SERVER_ERROR', error: err.error || err });
        }
    }
    static errorHandler(err, req, res) {
        if (err.code === 'NOT_FOUND') {
            return res.status(404).send({ message: 'URL does not extists' });
        }
        console.error(err);
        res.status(500).send({ message: 'Internal server error' });
    }
    execute(req, res) {
        return Promise.resolve()
            .then(() => {
            return RequestHandler.interceptors(req, res);
        })
            .then(() => {
            return RequestHandler.routers(req._url.pathname, req.method.toUpperCase(), req, res);
        })
            .catch(err => {
            return RequestHandler.exceptions(err, req, res);
        })
            .catch(err => {
            RequestHandler.errorHandler(err, req, res);
        });
    }
}
module.exports = new RequestHandler();

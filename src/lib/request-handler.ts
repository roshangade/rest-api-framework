/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
import { Request, Response, Middleware, Route, Exception } from './../utils/types';
import url from './../utils/url';
import stack from './stack';

/**
 * Request Handler
 */
class RequestHandler {

    private static async interceptors(req: Request, res: Response): Promise<void> {
        try {
            let middlewares: Middleware[] = stack.middlewares;
            for (let i = 0, count = middlewares.length; i < count; i++) {
                if (res.finished) break;
                await (middlewares[i]).task(req, res);
            }
        } catch (error) {
            return Promise.reject(error);
        }
        return Promise.resolve();
    };

    private static async routers(path: string, method: string, req: Request, res: Response): Promise<void> {
        try {
            let routes: Route[] = stack.routes;
            for (let i = 0, count = routes.length; i < count; i++) {
                if (res.finished) break;
                let route = routes[i];
                if ((route.method === method || route.method === 'ALL') && route.pattern.test(path)) {
                    (route.keys) && (req.params = url.parseParams(path, route.keys, route.pattern));
                    await route.task(req, res);
                }
            }
            if (!res.finished) throw { code: "NOT_FOUND" };
        } catch (error) {
            return Promise.reject(error);
        }
        return Promise.resolve();
    }

    private static async exceptions(err: Error | any, req: Request, res: Response): Promise<void> {
        try {
            let exceptions: Exception[] = stack.exceptions;
            for (let i = 0, count = exceptions.length; i < count; i++) {
                if (res.finished) break;
                let exception = exceptions[i];
                if ((exception.code && exception.code === err.code) || (!exception.code && !err.code)) {
                    await exception.task(err, req, res);
                }
            }
            if (!res.finished) throw { code: 'UNCAUGHT_ERROR', error: err };
        } catch (err) {
            return Promise.reject({ code: 'INTERNAL_SERVER_ERROR', error: err });
        }
    }

    private static errorHandler(err: Error | any, req: Request, res: Response): void {
        if (err.code === 'NOT_FOUND') {
            return res.status(404).send({ message: 'URL does not extists' });
        }
        console.error(err);
        res.status(500).send({ message: 'Internal server error' });
    }

    execute(req: Request, res: Response) {
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

export = new RequestHandler();
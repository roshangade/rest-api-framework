/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
import { Middleware, Route, Exception } from './../utils/types';

/**
 * Stack
 */
class Stack {
    private _middlewares: Array<Middleware> = [];
    private _routes: Array<Route> = [];
    private _exceptions: Array<Exception> = [];

    get middlewares(): Middleware[] {
        return this._middlewares;
    }

    get routes(): Route[] {
        return this._routes;
    }

    get exceptions(): Exception[] {
        return this._exceptions;
    }

    registerMiddleware(middleware: Middleware): void {
        this._middlewares.push(middleware);
    }

    registerRoute(route: Route): void {
        this._routes.push(route);
    }

    registerException(exception: Exception): void {
        this._exceptions.push(exception);
    }
};

export = new Stack();
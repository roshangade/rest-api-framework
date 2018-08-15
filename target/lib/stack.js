"use strict";
/**
 * Stack
 */
class Stack {
    constructor() {
        this._middlewares = [];
        this._routes = [];
        this._exceptions = [];
    }
    get middlewares() {
        return this._middlewares;
    }
    get routes() {
        return this._routes;
    }
    get exceptions() {
        return this._exceptions;
    }
    registerMiddleware(middleware) {
        this._middlewares.push(middleware);
    }
    registerRoute(route) {
        this._routes.push(route);
    }
    registerException(exception) {
        this._exceptions.push(exception);
    }
}
;
module.exports = new Stack();

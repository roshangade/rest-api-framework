/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
import { Middleware, Route, Exception } from '../utils/types';
/**
 * Stack
 */
declare class Stack {
    private _middlewares;
    private _routes;
    private _exceptions;
    readonly middlewares: Middleware[];
    readonly routes: Route[];
    readonly exceptions: Exception[];
    registerMiddleware(middleware: Middleware): void;
    registerRoute(route: Route): void;
    registerException(exception: Exception): void;
}
declare const _default: Stack;
export = _default;

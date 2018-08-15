/// <reference types="node" />
/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
import Http from 'http';
import { UrlObject } from 'url';
import { ParsedUrlQuery } from 'querystring';
export interface Config {
    [key: string]: any;
}
export interface UrlParams {
    [key: string]: string;
}
export interface RouteMatcher {
    pattern: RegExp;
    keys?: string[];
}
export interface Request extends Http.ServerRequest {
    body: any;
    _url: UrlObject;
    query: ParsedUrlQuery;
    params: UrlParams;
    _data: {
        [key: string]: any;
    };
    set: Function;
    get: Function;
}
export interface Response extends Http.ServerResponse {
    status: Function;
    send: Function;
    json: Function;
}
export interface Stack {
    middlewares: Middleware[];
    routes: Route[];
    exceptions: Exception[];
}
export interface Middleware {
    task: Function;
}
export interface Route {
    method: string;
    path: string;
    pattern: RegExp;
    keys?: string[];
    task: Function;
}
export interface Exception {
    code?: string;
    task: Function;
}
export interface Server extends Http.Server {
}

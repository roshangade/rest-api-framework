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
    _method: string;
    _body: any;
    _url: UrlObject;
    _query: ParsedUrlQuery;
    _params: UrlParams;
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
    interceptors: {
        task: Function;
    }[];
    routes: {
        method: string;
        path: string;
        pattern: RegExp;
        keys?: string[];
        task: Function;
    }[];
    exceptions: {
        code?: string;
        task: Function;
    }[];
}

/// <reference types="node" />
/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
import url from 'url';
import query from 'querystring';
import { UrlParams, RouteMatcher } from './types';
declare const _default: {
    parse: typeof url.parse;
    query: typeof query.parse;
    compile: (route: string) => RouteMatcher;
    params: (path: string, keys: string[], pattern: RegExp) => UrlParams;
};
/**
 * Expose
 */
export default _default;

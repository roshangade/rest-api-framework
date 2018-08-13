/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
import url from 'url';
import query from 'querystring';
import { UrlParams, RouteMatcher } from './types';

/**
 * Get params from url
 */
const getParams = (path: string, keys: string[], pattern: RegExp): UrlParams => {
    let params: UrlParams = {};
    let matches: RegExpExecArray = pattern.exec(path);
    matches.shift();
    keys.forEach((key: string, i: number) => (matches[i]) && (params[key] = matches[i] || ''));
    return params;
};

/**
 * Compile route
 */
const compile = (route: string): RouteMatcher => {

    let keys: string[] = [];
    let pattern: string | RegExp = '';
    let sep: string = '/';

    route.split(sep).filter((val: string) => !!val).forEach((val: string) => {
        let char: number = val.charCodeAt(0);
        switch (char) {
            case 42:
                keys.push('_url');
                pattern += sep + '(.*)';
                break;
            case 58:
                let length: number = val.length - 1
                let optional: boolean = val.charCodeAt(length) === 63;
                keys.push(val.substring(1, optional ? length : undefined));
                pattern += optional ? '(?:/([^/]+?))?' : sep + '([^/]+?)';
                break;
            default:
                pattern += sep + val;
        }
    });

    (!!keys.length) && (pattern += '(?:/)?');
    pattern = new RegExp('^' + pattern + '\/?$', 'i');
    return { pattern, keys: (keys.length) ? keys : undefined };
};

/**
 * Expose
 */
export default {
    parse: url.parse,
    query: query.parse,
    compile: compile,
    params: getParams
};
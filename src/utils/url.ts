/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
import url from 'url';
import query from 'querystring';
import { UrlParams, RouteMatcher } from './types';

/**
 * URL utilities
 */
class URL {

    parseUrl: Function;
    parseQuery: Function

    constructor() {
        this.parseUrl = url.parse;
        this.parseQuery = query.parse;
    }

    parseParams(path: string, keys: string[], pattern: RegExp): UrlParams {
        let params: UrlParams = {};
        let matches: RegExpExecArray = pattern.exec(path);
        matches.shift();
        keys.forEach((key: string, i: number) => (matches[i]) && (params[key] = matches[i] || ''));
        return params;
    }

    compile(route: string): RouteMatcher {
        let keys: string[] = [];
        let pattern: string | RegExp = '';
        let sep: string = '/';

        route.split(sep).filter((val: string) => !!val).forEach((val: string) => {
            switch (val.charCodeAt(0)) {
                case 42:
                    keys.push('_url');
                    pattern += sep + '(.*)';
                    break;
                case 58:
                    let length: number = val.length - 1;
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
    }
}

export = new URL();
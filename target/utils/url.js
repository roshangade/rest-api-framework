"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
const url_1 = __importDefault(require("url"));
const querystring_1 = __importDefault(require("querystring"));
/**
 * URL utilities
 */
class URL {
    constructor() {
        this.parseUrl = url_1.default.parse;
        this.parseQuery = querystring_1.default.parse;
    }
    parseParams(path, keys, pattern) {
        let params = {};
        let matches = pattern.exec(path);
        matches.shift();
        keys.forEach((key, i) => (matches[i]) && (params[key] = matches[i] || ''));
        return params;
    }
    compile(route) {
        let keys = [];
        let pattern = '';
        let sep = '/';
        route.split(sep).filter((val) => !!val).forEach((val) => {
            switch (val.charCodeAt(0)) {
                case 42:
                    keys.push('_url');
                    pattern += sep + '(.*)';
                    break;
                case 58:
                    let length = val.length - 1;
                    let optional = val.charCodeAt(length) === 63;
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
module.exports = new URL();

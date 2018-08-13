"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
const url_1 = __importDefault(require("url"));
const querystring_1 = __importDefault(require("querystring"));
/**
 * Get params from url
 */
const getParams = (path, keys, pattern) => {
    let params = {};
    let matches = pattern.exec(path);
    matches.shift();
    keys.forEach((key, i) => (matches[i]) && (params[key] = matches[i] || ''));
    return params;
};
/**
 * Compile route
 */
const compile = (route) => {
    let keys = [];
    let pattern = '';
    let sep = '/';
    route.split(sep).filter((val) => !!val).forEach((val) => {
        let char = val.charCodeAt(0);
        switch (char) {
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
};
/**
 * Expose
 */
exports.default = {
    parse: url_1.default.parse,
    query: querystring_1.default.parse,
    compile: compile,
    params: getParams
};

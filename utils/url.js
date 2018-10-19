'use strict';
/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
const url = require('url');
const query = require('querystring');

/**
 * URL utilities
 */
const Url = function () {
    return Object.freeze({
        parseUrl,
        parseQuery,
        parseParams,
        compile
    });
}

const parseUrl = function (...args) {
    return url.parse.apply(null, args);
};

const parseQuery = function (...args) {
    return query.parse.apply(null, args);
};

const parseParams = function (path, keys, pattern) {
    let params = {};
    let matches = pattern.exec(path);
    matches.shift();
    keys.forEach((key, i) => {
        if (matches[i]) params[key] = matches[i] || '';
    });
    return params;
};

const compile = function (route) {
    let keys = [];
    let pattern = '';
    let sep = '/';

    route.split(sep).filter((val) => !!val).forEach((val) => {
        switch (val.charCodeAt(0)) {
            case 42:
                pattern += '(.*)';
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
    let data = { pattern };
    (!!keys.length) && (data.keys = keys);
    return data;
};

module.exports = Url();
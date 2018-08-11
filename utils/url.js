/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
const url = require('url');
const query = require('querystring')

const URL = () => {
    return Object.assign({
        parse: url.parse,
        query: query.parse,
        compile,
        params
    });
};

const params = (path, keys, pattern) => {
    let params = {};
    let matches = pattern.exec(path);
    keys.forEach((key, i) => {
        params[key] = matches[i] || '';
    });
    return params;
};

const compile = (route) => {

    let keys = [];
    let pattern = '';
    let sep = '/';

    route.split(sep).filter(val => !!val).forEach(val => {
        let char = val.charCodeAt(0);
        switch (char) {
            case 42:
                keys.push('_url');
                pattern += sep + '(.*)';
                break;
            case 58:
                let length = val.length - 1
                let optional = val.charCodeAt(length) === 63;
                keys.push(val.substring(1, optional ? length : undefined));
                pattern += optional ? '(?:/([^/]+?))?' : sep + '([^/]+?)';
                break;
            default:
                pattern += sep + val;
        }
    });

    keys.length && (pattern += '(?:/)?');
    pattern = new RegExp('^' + pattern + '\/?$', 'i');
    return { pattern, keys: keys.length ? keys : undefined };
};

module.exports = URL();
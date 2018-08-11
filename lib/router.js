/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
const stack = require('./stack');
const { url } = require('./../utils');

const METHODS = ['ALL', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'];

const router = () => {
    return Object.assign({
        use,
        ..._router,
        error
    });
};

const use = (task) => {
    stack.interceptors.push({ task });
};

const _router = {};
METHODS.forEach(method => {
    _router[method.toLowerCase()] = (path, task) => {
        stack.routes.push({
            method,
            path,
            ...url.compile(path),
            task
        });
    }
});

const error = (code, task) => {
    if (typeof code === 'function') {
        task = code;
        code = undefined;
    }

    stack.exceptions.push({
        code,
        task
    });
}

module.exports = router();
/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
import stack from './stack';
import url from './../utils/url';

const METHODS = ['ALL', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'];

/**
 * Middleares
 */
const use = (task: Function) => {
    stack.interceptors.push({ task });
};

/**
 * Routers
 */
const _router: { [key: string]: Function } = {};
METHODS.forEach((method: string) => {
    _router[method.toLowerCase()] = (path: string, task: Function) => {
        stack.routes.push({
            method,
            path,
            ...url.compile(path),
            task
        });
    }
});

/**
 * Error handlers
 */
const error = (code: string | Function, task?: Function) => {
    let handle;
    if (typeof code === 'function') {
        handle = {
            task: code
        }
    } else {
        handle = {
            code,
            task
        }
    }

    stack.exceptions.push(handle);
}

/**
 * Expose
 */
const a = {
    use,
    ..._router,
    error
};

export = a;
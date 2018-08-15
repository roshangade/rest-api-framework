/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
import url from './../utils/url';
import stack from './stack';

/**
 * Router
 */
class Router {
    private METHODS: string[] = ['ALL', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'];

    use(task: Function) {
        stack.registerMiddleware({ task });
    }

    private static _route(method: string, path: string, task: Function) {
        stack.registerRoute({
            method: 'ALL',
            path,
            ...url.compile(path),
            task
        });
    }

    all(path: string, task: Function) {
        Router._route('ALL', path, task);
    }

    get(path: string, task: Function) {
        Router._route('GET', path, task);
    }

    post(path: string, task: Function) {
        Router._route('POST', path, task);
    }

    put(path: string, task: Function) {
        Router._route('PUT', path, task);
    }

    delete(path: string, task: Function) {
        Router._route('DELETE', path, task);
    }

    options(path: string, task: Function) {
        Router._route('OPTIONS', path, task);
    }

    head(path: string, task: Function) {
        Router._route('HEAD', path, task);
    }

    error(code: string | Function, task?: Function) {
        let handle = (typeof code === 'function') ? { task: code } : { code, task }
        stack.registerException(handle);
    }

}

export = new Router();
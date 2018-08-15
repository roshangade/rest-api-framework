/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
import stack from './stack';
import { Router } from './router';
import { ExpressRouter } from './express-router';

/**
 * Router
 */
class Route extends Router {

    constructor() {
        super('');
    }

    use(task: Function) {
        stack.registerMiddleware({ task });
    }

    for(path: string) {
        return new ExpressRouter(path);
    }

    error(code: string | Function, task?: Function) {
        let handle = (typeof code === 'function') ? { task: code } : { code, task }
        stack.registerException(handle);
    }

}

export = new Route();
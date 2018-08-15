/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
import stack from './stack';
import { Router } from './router';

/**
 * Router
 */
export class ExpressRouter extends Router {

    constructor(prefix: string) {
        prefix = prefix.replace(/(^\/)|(\/$)/g, "");
        super(prefix);
    }

    use(task: Function) {
        this.all('.*', task);
    }

}
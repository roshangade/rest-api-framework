/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
import stack from './stack';
import url from '../utils/url';

export class Router {

    protected prefix: string;

    constructor(prefix: string) {
        this.prefix = prefix || '';
    }

    private static _route(method: string, path: string, task: Function) {
        stack.registerRoute({
            method,
            path,
            ...url.compile(path),
            task
        });
    }

    all(path: string, task: Function) {
        console.log('============> ', this.prefix + path)
        Router._route('ALL', this.prefix + path, task);
    }

    get(path: string, task: Function) {
        Router._route('GET', this.prefix + path, task);
        //console.log('=============>', stack.routes)
    }

    post(path: string, task: Function) {
        Router._route('POST', this.prefix + path, task);
    }

    put(path: string, task: Function) {
        Router._route('PUT', this.prefix + path, task);
    }

    delete(path: string, task: Function) {
        Router._route('DELETE', this.prefix + path, task);
    }

    options(path: string, task: Function) {
        Router._route('OPTIONS', this.prefix + path, task);
    }
}
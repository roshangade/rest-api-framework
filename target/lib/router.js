"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
const url_1 = __importDefault(require("./../utils/url"));
const stack_1 = __importDefault(require("./stack"));
/**
 * Router
 */
class Router {
    constructor() {
        this.METHODS = ['ALL', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'];
    }
    use(task) {
        stack_1.default.registerMiddleware({ task });
    }
    static _route(method, path, task) {
        stack_1.default.registerRoute(Object.assign({ method: 'ALL', path }, url_1.default.compile(path), { task }));
    }
    all(path, task) {
        Router._route('ALL', path, task);
    }
    get(path, task) {
        Router._route('GET', path, task);
    }
    post(path, task) {
        Router._route('POST', path, task);
    }
    put(path, task) {
        Router._route('PUT', path, task);
    }
    delete(path, task) {
        Router._route('DELETE', path, task);
    }
    options(path, task) {
        Router._route('OPTIONS', path, task);
    }
    head(path, task) {
        Router._route('HEAD', path, task);
    }
    error(code, task) {
        let handle = (typeof code === 'function') ? { task: code } : { code, task };
        stack_1.default.registerException(handle);
    }
}
module.exports = new Router();

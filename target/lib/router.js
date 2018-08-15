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
const stack_1 = __importDefault(require("./stack"));
const url_1 = __importDefault(require("../utils/url"));
class Router {
    constructor(prefix) {
        this.prefix = prefix || '';
    }
    static _route(method, path, task) {
        stack_1.default.registerRoute(Object.assign({ method,
            path }, url_1.default.compile(path), { task }));
    }
    all(path, task) {
        Router._route('ALL', this.prefix + path, task);
    }
    get(path, task) {
        Router._route('GET', this.prefix + path, task);
    }
    post(path, task) {
        Router._route('POST', this.prefix + path, task);
    }
    put(path, task) {
        Router._route('PUT', this.prefix + path, task);
    }
    delete(path, task) {
        Router._route('DELETE', this.prefix + path, task);
    }
    options(path, task) {
        Router._route('OPTIONS', this.prefix + path, task);
    }
}
exports.Router = Router;

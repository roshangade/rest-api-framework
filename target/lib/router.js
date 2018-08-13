"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
const stack_1 = __importDefault(require("./stack"));
const url_1 = __importDefault(require("./../utils/url"));
const METHODS = ['ALL', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'];
/**
 * Middleares
 */
const use = (task) => {
    stack_1.default.interceptors.push({ task });
};
/**
 * Routers
 */
const _router = {};
METHODS.forEach((method) => {
    _router[method.toLowerCase()] = (path, task) => {
        stack_1.default.routes.push(Object.assign({ method,
            path }, url_1.default.compile(path), { task }));
    };
});
/**
 * Error handlers
 */
const error = (code, task) => {
    let handle;
    if (typeof code === 'function') {
        handle = {
            task: code
        };
    }
    else {
        handle = {
            code,
            task
        };
    }
    stack_1.default.exceptions.push(handle);
};
/**
 * Expose
 */
const a = Object.assign({ use }, _router, { error });
module.exports = a;

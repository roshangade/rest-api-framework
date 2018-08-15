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
const router_1 = require("./router");
const express_router_1 = require("./express-router");
/**
 * Router
 */
class Route extends router_1.Router {
    constructor() {
        super('');
    }
    use(task) {
        stack_1.default.registerMiddleware({ task });
    }
    for(path) {
        return new express_router_1.ExpressRouter(path);
    }
    error(code, task) {
        let handle = (typeof code === 'function') ? { task: code } : { code, task };
        stack_1.default.registerException(handle);
    }
}
module.exports = new Route();

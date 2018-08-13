"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
const app_1 = __importDefault(require("./lib/app"));
const router_1 = __importDefault(require("./lib/router"));
const server_1 = __importDefault(require("./lib/server"));
const rest = () => {
    return Object.assign({
        app: app_1.default,
        router: router_1.default,
        server: server_1.default
    });
};
module.exports = rest();

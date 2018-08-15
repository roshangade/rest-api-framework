"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
const application_1 = __importDefault(require("./lib/application"));
const route_1 = __importDefault(require("./lib/route"));
const server_1 = __importDefault(require("./lib/server"));
class API {
    constructor() {
        this._app = application_1.default;
        this._route = route_1.default;
        this._server = server_1.default;
    }
    get app() {
        return this._app;
    }
    get route() {
        return this._route;
    }
    get server() {
        return this._server;
    }
}
module.exports = new API();

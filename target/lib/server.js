"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
const http_1 = __importDefault(require("http"));
const request_handler_1 = __importDefault(require("./request-handler"));
/**
 * Create sesrver
 */
const server = http_1.default.createServer((req, res) => {
    request_handler_1.default.execute(req, res);
});
module.exports = server;

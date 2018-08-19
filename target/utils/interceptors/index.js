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
const request_1 = __importDefault(require("./request"));
const response_1 = __importDefault(require("./response"));
const body_parser_1 = __importDefault(require("./body-parser"));
exports.default = {
    request: request_1.default,
    response: response_1.default,
    bodyParser: body_parser_1.default
};

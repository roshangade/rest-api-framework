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
const url_1 = __importDefault(require("./../url"));
/**
 * Parse URL and Query
 */
const requestHandler = (req) => {
    req._method = req.method.toUpperCase();
    req._url = url_1.default.parse(req.url);
    req._query = url_1.default.query(String(req._url.query));
    req._params = {};
    req._data = {};
    // set data
    req.set = (key, value) => {
        req._data[key] = value;
    };
    // get data
    req.get = (key) => req._data[key];
};
exports.default = requestHandler;

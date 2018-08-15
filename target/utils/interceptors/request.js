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
const _request = (req, res) => {
    req._url = url_1.default.parseUrl(req.url);
    req.query = url_1.default.parseQuery(String(req._url.query));
    req.params = {};
    // Data Carrier
    req._data = {};
    req.set = (key, value) => {
        req._data[key] = value;
    };
    req.get = (key) => req._data[key];
};
exports.default = _request;

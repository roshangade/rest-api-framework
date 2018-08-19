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
const querystring_1 = __importDefault(require("querystring"));
const zlib_1 = __importDefault(require("zlib"));
// default types
const types = {
    json: [
        'application/json',
        'application/json-patch+json',
        'application/vnd.api+json',
        'application/csp-report'
    ],
    form: [
        'application/x-www-form-urlencoded'
    ],
    text: [
        'text/plain'
    ]
};
const JSON_REGEX = /^[\x20\x09\x0a\x0d]*(\[|\{)/;
//TODO: limit should be configurable, add types,
/**
 * Body parser
 */
const parser = (req, res) => {
    try {
        let type = contentType(req.headers['content-type']);
        if (!~['POST', 'PUT', 'DELETE'].indexOf(req.method) || !type)
            return;
        let stream = contentEncoding(req, req.headers['content-encoding']);
        let data = [];
        let limit = 100 * 1000;
        let received = 0;
        return new Promise((resolve, reject) => {
            stream.on('data', chunk => {
                if (!received && type === 'json') {
                    let _chunk = chunk.toString();
                    if (!JSON_REGEX.test(_chunk)) {
                        return reject(new Error('Invalid JSON'));
                    }
                }
                received += chunk.length;
                if (received > limit) {
                    return reject(new Error("Request body is too large"));
                }
                data.push(chunk);
            });
            stream.on('error', () => {
                data = null;
                reject(new Error('Request error'));
            });
            stream.on('end', () => {
                try {
                    req.body = parse(data, type);
                    resolve();
                }
                catch (e) {
                    reject(new Error('Body parse error'));
                }
            });
            stream.on('close', () => {
                data = null;
            });
            stream.on('abort', () => {
                data = null;
                reject(new Error('Request aborted'));
            });
        });
    }
    catch (e) {
        return Promise.reject(e);
    }
};
const parse = (buffer, type) => {
    let body = Buffer.concat(buffer).toString();
    let data;
    switch (type) {
        case 'json':
            data = JSON.parse(body);
            break;
        case 'form':
            data = querystring_1.default.parse(body);
            break;
        default:
            data = body;
    }
    return data;
};
const contentType = (type) => {
    type = type.toLowerCase();
    if (~types.json.indexOf(type)) {
        return 'json';
    }
    else if (~types.form.indexOf(type)) {
        return 'form';
    }
    else if (~types.text.indexOf(type)) {
        return 'text';
    }
    return;
};
const contentEncoding = (req, encoding) => {
    encoding = (encoding || 'identity').toLowerCase();
    switch (encoding) {
        case 'gzip':
        case 'deflate':
            req.pipe(zlib_1.default.createUnzip());
            break;
        case 'identity':
            break;
        default:
            throw new Error('Unsupported Content-Encoding: ' + encoding);
    }
    return req;
};
exports.default = parser;

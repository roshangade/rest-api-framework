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
const util_1 = __importDefault(require("util"));
const gunzip = util_1.default.promisify(zlib_1.default.gunzip);
const inflate = util_1.default.promisify(zlib_1.default.inflate);
/**
 * Body parser
 */
const parser = (req, res) => {
    let contentEncoding = (req.headers['content-encoding'] || 'identity').toLowerCase();
    let contentType = (req.headers['content-type'] || '').toLowerCase();
    let method = !!~['POST', 'PUT', 'DELETE'].indexOf(req.method);
    let json = !!~contentType.indexOf('json');
    let urlencoded = !!~contentType.indexOf('x-www-form-urlencoded');
    return new Promise((resolve, reject) => {
        if (!(method && (json || urlencoded))) {
            return resolve();
        }
        let body = [];
        let _reject = (err) => reject({ code: err.code || 'UNSUPPORTED_MEDIA_TYPE', error: err.error || err });
        // Grab data
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        // On request end
        req.on('end', async () => {
            try {
                console.log('json......', json);
                let _body = await decode(contentEncoding, Buffer.concat(body));
                req.body = parse(json, _body.toString());
                console.log('body.........', req.body);
                resolve();
            }
            catch (e) {
                _reject(e);
            }
        });
        // Error
        req.on('error', _reject);
    });
};
const parse = (json, data) => {
    try {
        return (json) ? JSON.parse(data) : querystring_1.default.parse(data);
    }
    catch (e) {
        throw { code: 'CONTENT_PARSE_ERROR', error: e };
    }
};
const decode = (type, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let buf;
            switch (type) {
                case 'gzip':
                    buf = await gunzip(data);
                    break;
                case 'deflate':
                    buf = await inflate(data);
                    break;
                case 'identity':
                    buf = data;
                    break;
                default:
                    throw new Error('Content encoding unsupported');
            }
            resolve(buf);
        }
        catch (e) {
            reject({ code: 'CONTENT_ENCODING_UNSUPPORTED', error: e });
        }
    });
};
exports.default = parser;

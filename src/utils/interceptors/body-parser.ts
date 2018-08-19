/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
import query from 'querystring';
import { ParsedUrlQuery } from 'querystring';
import zlib from 'zlib';
import util from 'util';
import { Request, Response } from './../types';

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
const parser = (req: Request, res: Response): Promise<void> => {
    try {
        let type = contentType(req.headers['content-type']);
        if (!~['POST', 'PUT', 'DELETE'].indexOf(req.method) || !type) return;

        let stream = contentEncoding(req, req.headers['content-encoding']);
        let data: Array<Buffer> = [];
        let limit: number = 100 * 1000;
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
                } catch (e) {
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
    } catch (e) {
        return Promise.reject(e);
    }
};

const parse = (buffer: Array<Buffer>, type: string) => {
    let body = Buffer.concat(buffer).toString();
    let data: JSON | ParsedUrlQuery | string;
    switch (type) {
        case 'json':
            data = JSON.parse(body);
            break;
        case 'form':
            data = query.parse(body);
            break;
        default:
            data = body;
    }
    return data;
}

const contentType = (type: string): string => {
    type = type.toLowerCase();
    if (~types.json.indexOf(type)) {
        return 'json';
    } else if (~types.form.indexOf(type)) {
        return 'form'
    } else if (~types.text.indexOf(type)) {
        return 'text'
    }
    return;
};

const contentEncoding = (req: Request, encoding: string): Request => {
    encoding = (encoding || 'identity').toLowerCase();
    switch (encoding) {
        case 'gzip':
        case 'deflate':
            req.pipe(zlib.createUnzip());
            break
        case 'identity':
            break;
        default:
            throw new Error('Unsupported Content-Encoding: ' + encoding);
    }
    return req;
};

export default parser;
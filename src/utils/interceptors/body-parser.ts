/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
import query from 'querystring';
import zlib from 'zlib';
import util from 'util';
import { Request, Response } from './../types';

const gunzip = util.promisify(zlib.gunzip);
const inflate = util.promisify(zlib.inflate)
/**
 * Body parser
 */
const parser = (req: Request, res: Response): Promise<void> => {
    let contentEncoding = (req.headers['content-encoding'] || 'identity').toLowerCase();
    let contentType = (req.headers['content-type'] || '').toLowerCase();
    let method = !!~['POST', 'PUT', 'DELETE'].indexOf(req.method);
    let json = !!~contentType.indexOf('json');
    let urlencoded = !!~contentType.indexOf('x-www-form-urlencoded');
    return new Promise((resolve, reject) => {
        if (!(method && (json || urlencoded))) {
            return resolve();
        }

        let body: Buffer[] = [];
        let _reject = (err: Error | any) => reject({ code: err.code || 'UNSUPPORTED_MEDIA_TYPE', error: err.error || err });

        // Grab data
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        // On request end
        req.on('end', async () => {
            try {
                console.log('json......', json)
                let _body = await decode(contentEncoding, Buffer.concat(body));
                req.body = parse(json, _body.toString());
                console.log('body.........', req.body);
                resolve();
            } catch (e) {
                _reject(e);
            }
        });

        // Error
        req.on('error', _reject);
    });
};

const parse = (json: boolean, data: string) => {
    try {
        return (json) ? JSON.parse(data) : query.parse(data);
    } catch (e) {
        throw { code: 'CONTENT_PARSE_ERROR', error: e }
    }
}

const decode = (type: string, data: Buffer): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            let buf: any;
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
        } catch (e) {
            reject({ code: 'CONTENT_ENCODING_UNSUPPORTED', error: e });
        }
    });

};

export default parser;
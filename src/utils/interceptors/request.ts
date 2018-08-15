/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
import url from '../url';
import { Request, Response } from '../types';

/**
 * Parse URL and Query
 */
const _request = (req: Request, res: Response) => {
    req._url = url.parseUrl(req.url);
    req.query = url.parseQuery(String(req._url.query));
    req.params = {};

    // Data Carrier
    req._data = {};
    req.set = (key: string, value: any) => {
        req._data[key] = value;
    };
    req.get = (key: string) => req._data[key];
};

export default _request;
/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
import url from './../url';
import { Request } from './../types';

/**
 * Parse URL and Query
 */
const requestHandler = (req: Request) => {
    req._method = req.method.toUpperCase();
    req._url = url.parse(req.url);
    req._query = url.query(String(req._url.query));
    req._params = {};

    req._data = {};
    // set data
    req.set = (key: string, value: any) => {
        req._data[key] = value;
    };

    // get data
    req.get = (key: string) => req._data[key];
};

export default requestHandler;
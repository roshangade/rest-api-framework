/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
import { Request, Response } from '../types';

/**
 * Response Handlers
 */
const _response = (req: Request, res: Response) => {
    let send: Function = res.end;

    res.status = (code: number) => {
        res.statusCode = code;
        return res;
    };

    res.json = res.send = (data: object | string) => {
        if (typeof data === 'object') {
            res.setHeader('Content-Type', 'application/json');
            data = JSON.stringify(data);
        }
        send.call(res, data);
    };
};

export default _response;
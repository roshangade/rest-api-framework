/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
import { Request, Response } from './../utils/types';
import http from 'http';
import handler from './handler';

/**
 * Create sesrver
 */
const server = http.createServer((req: Request, res: Response) => {
    return handler(req, res)
});

export default server;
/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
import http from 'http';
import { Server, Request, Response } from '../utils/types';
import handler from './request-handler';

/**
 * Create sesrver
 */
const server: Server = http.createServer();

server.on('request', (req: Request, res: Response): void => {
    handler.execute(req, res);
});

export = server;

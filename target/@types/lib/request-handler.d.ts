/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
import { Request, Response } from '../utils/types';
/**
 * Request Handler
 */
declare class RequestHandler {
    private static interceptors;
    private static routers;
    private static exceptions;
    private static errorHandler;
    execute(req: Request, res: Response): Promise<void>;
}
declare const _default: RequestHandler;
export = _default;

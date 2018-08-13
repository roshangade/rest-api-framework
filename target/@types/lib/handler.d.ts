/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
import { Request, Response } from './../utils/types';
/**
 * Promise - Request handler
 */
declare const handler: (req: Request, res: Response) => Promise<void>;
export default handler;

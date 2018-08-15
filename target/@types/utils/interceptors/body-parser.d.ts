import { Request, Response } from './../types';
/**
 * Body parser
 */
declare const parser: (req: Request, res: Response) => Promise<void>;
export default parser;

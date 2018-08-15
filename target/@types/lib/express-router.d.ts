import { Router } from './router';
/**
 * Router
 */
export declare class ExpressRouter extends Router {
    constructor(prefix: string);
    use(task: Function): void;
}

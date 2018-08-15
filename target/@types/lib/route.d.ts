import { Router } from './router';
import { ExpressRouter } from './express-router';
/**
 * Router
 */
declare class Route extends Router {
    constructor();
    use(task: Function): void;
    for(path: string): ExpressRouter;
    error(code: string | Function, task?: Function): void;
}
declare const _default: Route;
export = _default;

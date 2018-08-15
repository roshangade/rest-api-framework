/**
 * Router
 */
declare class Router {
    private METHODS;
    use(task: Function): void;
    private static _route;
    all(path: string, task: Function): void;
    get(path: string, task: Function): void;
    post(path: string, task: Function): void;
    put(path: string, task: Function): void;
    delete(path: string, task: Function): void;
    options(path: string, task: Function): void;
    head(path: string, task: Function): void;
    error(code: string | Function, task?: Function): void;
}
declare const _default: Router;
export = _default;

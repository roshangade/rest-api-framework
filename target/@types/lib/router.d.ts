export declare class Router {
    protected prefix: string;
    constructor(prefix: string);
    private static _route;
    all(path: string, task: Function): void;
    get(path: string, task: Function): void;
    post(path: string, task: Function): void;
    put(path: string, task: Function): void;
    delete(path: string, task: Function): void;
    options(path: string, task: Function): void;
}

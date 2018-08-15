/**
 * Application
 */
declare class Application {
    private config;
    constructor();
    set(key: string, value: any): void;
    get(key: string): any;
}
declare const _default: Application;
export = _default;

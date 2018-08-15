import { UrlParams, RouteMatcher } from './types';
/**
 * URL utilities
 */
declare class URL {
    parseUrl: Function;
    parseQuery: Function;
    constructor();
    parseParams(path: string, keys: string[], pattern: RegExp): UrlParams;
    compile(route: string): RouteMatcher;
}
declare const _default: URL;
export = _default;

/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
import { Config } from '../utils/types';
import interceptors from '../utils/interceptors';
import route from './route';

/**
 * Application
 */
class Application {

    private config: Config = {};

    constructor() {
        route.use(interceptors.request);
        route.use(interceptors.response);
    }

    set(key: string, value: any): void {
        this.config[key] = value;
    };

    get(key: string): any {
        try {
            return key.split(':').reduce((val, key) => val[key], this.config);
        } catch (e) { }
        return undefined;
    }
}

export = new Application();
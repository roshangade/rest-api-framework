/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
import { Config } from './../utils/types';
import interceptors from './../utils/interceptors';
import router from './router';

/**
 * Application
 */
class Application {

    private config: Config = {};

    constructor() {
        router.use(interceptors.request);
        router.use(interceptors.response);
    }

    set(key: string, value: any) {
        this.config[key] = value;
    };

    get(key: string) {
        return this.config[key];
    }
}

export = new Application();
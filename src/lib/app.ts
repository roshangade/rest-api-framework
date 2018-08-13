/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
import interceptors from './../utils/interceptors';
import { Config } from './../utils/types';
import router from './router';

/**
 * Application
 */
const app = () => {
    router.use(interceptors.request);
    router.use(interceptors.response);

    const config: Config = {};

    const set = (key: string, value: any) => {
        config[key] = value;
    };

    const get = (key: string) => config[key];

    return Object.assign({
        set,
        get
    });
};

export default app();
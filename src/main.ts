/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
import app from './lib/app';
import router from './lib/router';
import server from './lib/server';

const rest = () => {
    return Object.assign({
        app,
        router,
        server
    });
};

export = rest();
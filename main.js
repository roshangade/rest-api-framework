/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
const app = require('./lib/app');
const router = require('./lib/router');
const server = require('./lib/server');

const rest = () => {
    return Object.assign({
        app,
        router,
        server
    });
};

module.exports = rest();
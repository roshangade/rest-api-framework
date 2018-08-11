/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
const http = require('http');
const handler = require('./handler');
const dj = require('./dj');

const server = http.createServer((req, res) => {
    return handler(req, res)
        .then(() => {
            dj(req, res);
        });
});

module.exports = server;
'use strict';
/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
const http = require('http');
const handler = require('./request-handler');

/**
 * Create sesrver
 */
const server = http.createServer();

server.on('request', (req, res) => {
    handler.execute(req, res);
});

module.exports = server;

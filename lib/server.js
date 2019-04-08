'use strict';
/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
const http = require('http');
const handler = require('./request-handler');

/**
 * Create server
 * For HTTPS, use other servers (data encryption and decryption are heavy operations on application)
 */
const server = http.createServer();

/**
 * On every server request, execute request handler
 */
server.on('request', (req, res) => {
    handler.execute(req, res);
});

module.exports = server;

/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
const request = require('./request');
const response = require('./response');
const urlParser = require('./url-parser');

const interceptors = () => {
    return Object.assign({
        request,
        response,
        urlParser
    });
};

module.exports = interceptors();
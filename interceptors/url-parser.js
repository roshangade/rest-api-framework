/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
const { url } = require('./../utils');

const urlParser = (req) => {
    req._url = url.parse(req.url);
    req._url.query = url.query(req._url.query);
};

module.exports = urlParser;
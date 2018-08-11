/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */

const request = (req, res) => {
    req.method = req.method.toUpperCase();
};

module.exports = request;
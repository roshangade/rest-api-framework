'use strict';
/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */

/**
 * Response Handlers
 */
const response = (req, res) => {
    let send = res.end;

    // set status coce
    res.status = (code) => {
        res.statusCode = code;
        return res;
    };

    // parse response
    // TODO: data streaming
    res.json = res.send = (data) => {
        if (typeof data === 'object') {
            res.setHeader('Content-Type', 'application/json');
            data = JSON.stringify(data);
        }
        send.call(res, data);
    };
};

module.exports = response;
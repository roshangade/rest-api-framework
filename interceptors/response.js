/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */

const stringify = (data) => {
    return (typeof data === 'object') ? JSON.stringify(data) : data;
};

const response = (req, res) => {
    let send = res.end;

    res.status = (code) => {
        res.statusCode = code;
        return res;
    }

    res.json = res.send = res.end = (data) => {
        res.setHeader('Content-Type', 'application/json');
        send.call(res, stringify(data));
    }
};

module.exports = response;
/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */

const response = (req, res) => {
    let send = res.end;

    res.status = (code) => {
        res.statusCode = code;
        return res;
    }

    res.json = res.send = res.end = (data) => {
        if (typeof data === 'object') {
            res.setHeader('Content-Type', 'application/json');
            data = JSON.stringify(data);
        }
        send.call(res, data);
    }
};

module.exports = response;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Response Handlers
 */
const responseHandler = (req, res) => {
    let send = res.end;
    res.status = (code) => {
        res.statusCode = code;
        return res;
    };
    res.send = res.end = (data) => {
        if (typeof data === 'object') {
            res.setHeader('Content-Type', 'application/json');
            data = JSON.stringify(data);
        }
        send.call(res, data);
    };
};
exports.default = responseHandler;

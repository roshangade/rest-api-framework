"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Response Handlers
 */
const _response = (req, res) => {
    let send = res.end;
    res.status = (code) => {
        res.statusCode = code;
        return res;
    };
    res.json = res.send = (data) => {
        if (typeof data === 'object') {
            res.setHeader('Content-Type', 'application/json');
            data = JSON.stringify(data);
        }
        send.call(res, data);
    };
};
exports.default = _response;

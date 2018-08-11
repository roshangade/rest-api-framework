/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
const {request, response, urlParser} = require('./../interceptors');
const router = require('./router');

const app = () => {
    router.use(request);
    router.use(response);
    router.use(urlParser);

    return Object.assign({
        set,
        get
    });
};

const config = {};

const set = (key, value) => {
    config[key] = value;
};

const get = (key) => config[key];


module.exports = app();
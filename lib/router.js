/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
const stack = require('./stack');

const router = () => {
    return Object.assign({
        use,
    });
};

const use = (task) => {
    stack.interceptors.push({ task });
};

module.exports = router();
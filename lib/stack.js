/*!
 * rest-api-framework
 * Copyright(c) 2018 Roshan Gade
 * MIT Licensed
 */
const { url } = require('./../utils')

// TODO: dynamic stacks
const stack = {
    interceptors: [{
        task: (req, res) => {
            console.log('All');
        }
    }, {
        task: (req, res) => {
            console.log('GET specific');
            return new Promise(resolve => setTimeout(resolve, 1000));
        }
    }, {
        task: (req, res) => {
            console.log('GET params');
        }
    }],
    routes: [{
        method: 'ALL',
        path: '/*',
        ...url.compile('/*'),
        task: (req, res) => {
            console.log(req._url)
            throw new Error('test');
            res.end(JSON.stringify({all: 1}));
            console.log('All');

        }
    }, {
        method: 'GET',
        path: '/a',
        ...url.compile('/a'),
        task: (req, res) => {
            console.log('GET specificeeee ------------');
        }
    }, {
        method: 'GET',
        path: '/:a',
        ...url.compile('/:a'),
        task: (req, res) => {
            res.end(JSON.stringify({[req.params.a]: 1}))
            console.log('GET params errrrrrrrrrrrrrrrrrrrr');
        }
    }],
    exceptions: [{
        method: 'ALL',
        path: '/:a',
        code: 'test',
        ...url.compile('/:a'),
        task: (err, req, res) => {
            res.end(JSON.stringify({message: err.message}))
            console.log('GET params errrrrrrrrrrrrrrrrrrrr');
        }
    }, {
        method: 'ALL',
        path: '/:a',
        ...url.compile('/:a'),
        task: (err, req, res) => {
            res.end(JSON.stringify({error_message: err.message}))
            console.log('GET params errrrrrrrrrrrrrrrrrrrr');
        }
    }]
};

module.exports = stack;
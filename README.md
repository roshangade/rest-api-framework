# Introduction
Simple REST API framework for Node.js

[![npm version](https://img.shields.io/npm/v/rest-api-framework.svg)](https://www.npmjs.com/package/rest-api-framework)
[![npms score](https://badges.npms.io/rest-api-framework.svg)](https://npms.io/search?q=rest-api-framework)
[![github_actions status](https://github.com/roshangade/rest-api-framework/workflows/CI/badge.svg)](https://github.com/roshangade/rest-api-framework/actions?query=workflow%3ACI)
[![codecov](https://codecov.io/gh/roshangade/rest-api-framework/branch/master/graph/badge.svg)](https://codecov.io/gh/roshangade/rest-api-framework)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/336e8b4ad77f483ab57cd8112006de87)](https://app.codacy.com/app/roshangade/rest-api-framework?utm_source=github.com&utm_medium=referral&utm_content=roshangade/rest-api-framework&utm_campaign=Badge_Grade_Dashboard)
[![Known Vulnerabilities](https://snyk.io//test/github/roshangade/rest-api-framework/badge.svg?targetFile=package.json)](https://snyk.io//test/github/roshangade/rest-api-framework?targetFile=package.json)
[![dependencies Status](https://david-dm.org/roshangade/rest-api-framework/status.svg)](https://david-dm.org/roshangade/rest-api-framework)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)
<!--[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/3143/badge)](https://bestpractices.coreinfrastructure.org/projects/3143)-->

# Highlights

- No need to set app as global variable
  > Will provide a route method, route.get, route.use,_ etc.
- No need to use deprecated domain-context for error handler
  > Will handle it in Promise
- Extend server for more use
  > Use _route.for_ method
- Load config in app
  > Use _app.set_ and _app.get_ method
- Zero dependency 
  > No need to bother about vulnerabilities
- TypeScript support
  > Added required types for TypeScript
- Can easily execute deferred/delayed jobs
  > Added support to execute your deferred functions after request end 
***
# How to use
```
const { app, route, requestListener } = require('rest-api-framework');

app.set('foo', 'bar');
app.get('foo');
// Output: bar

app.set('config', {
    'foo': 1,
    'bar': {
        'test': 2
    }
});

app.get('config.foo'); 
// Output: 1
app.get('config.bar.test');
// Output: 2

```

### Register middlewares
- Instead of callback, we expect Promise in return.
- If you are doing an asynchronous task then return Promise else no need to return anything
- Also, you can set and get data in request context using _req.set_ and _req.get_ methods

For asynchronous task:
```
route.use((req, res) => {
    // set data
    req.set('foo', 'bar');
    
    // for asynchronous return Promise
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 100));
    });
    
});
```

For synchronous task:
```
route.use((req, res) => {
    // get data
    let foo = req.get('foo');
    
    // do some sync
});
```

### Route
- :page - (:) required url parameter (similar to express)
- :limit? - (:?) optional url paramater
```
route.get('/', (req, res) => {
    res.send({test: 1});
});

route.get('/page/:page/:limit?', (req, res) => {
    res.send(req.params);
});
```

## Extended Route
```
let test = route.for('/test');

test.use((req, res) => {
    // middleware for /test and /test/*
})

test.get('/', (req, res) => {
    // route for /test
    res.send('test');
});

test.post('/:uid', (req, res) => {
    // route for /test/1 OR /test/abc OR etc.
    res.send('test');
});
```

## How to use other middlewares?
For example: Body parser
```
const util = require('util');
const bodyParser = require('body-parser');

// can use Node.js's utils module to convert callback function into Promise
const jsonBodyParser = util.promisify(bodyParser.json());
const urlEncodedBodyParser = util.promisify(bodyParser.urlencoded({extended: true}))

route.use(jsonBodyParser);
route.use(urlEncodedBodyParser);
```

## How to execute deferred jobs?
```
const { route } = require('rest-api-framework')

// Register deferred jobs
route.deferred('LOG', (data) => {
    console.log(data)
})

route.deferred('ANALYTICS', (data) => {
    //TODO: send data to analytics server and return promise
})

// Execute registered deferred jobs by passing data
route.get('/foo', (req, res) => {
    // NOTE: registration of deferred jobs matters for sequential execution
    req.defer('LOG_REQUEST', {})
    // execute request and send response 
    res.send('foo is ended')
    req.defer('ANALYTICS', {})
})

```

### Error Handler
A new way to handle errors and exceptions
```
// Throwing error
route.get('/error', (req, res) => {
    // throw custom error and set code
    return Promise.reject({ code: 'NOT_AUTHORIZED' })
});

//Catching error
route.error('NOT_AUTHORIZED', (err, req, res) => {
    // Also, you can use ###err### for error detail
    res.status(401).send({ message: 'You are not authorized.'});
});
```

### Uncaught Errors
Common error handler method for all errors
```
route.error((err, req, res) => {
    // common error handler
    res.status(500).send({ message: "Internal Server Error" });
});
```

### start server
```
const {requestListener} = require('rest-api-framework')

http.createServer(requestListener).listen(3000);
```

### TypeScript Example
```
import http from 'http'
import {app, route, requestListener, rest} from 'rest-api-framework'

app.set('ENV', 'development')

route.use((req: rest.Request): void => {
    req.set('flag', 1)
})

route.get('/', (req: rest.Request, res: rest.Response): void => {
    res.send('Hello, World!')
})

route.get('/error', (req: rest.Request, res: rest.Response) : Promise<void> => {
    return Promise.reject(new Error('custom error'))
})

route.error('NOT_FOUND', (err: Error, req: rest.Request, res: rest.Response) => {
    // status 404
})

http.createServer(requestListener).listen(3000)
```
## Sponsors
[<img src="https://avatars0.githubusercontent.com/u/878437?s=200&v=4">](https://www.jetbrains.com/?from=Go+REST+Services)

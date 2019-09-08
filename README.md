# Introduction
Simple REST API framework for Node.js

[![npm version](https://img.shields.io/npm/v/rest-api-framework.svg)](https://www.npmjs.com/package/rest-api-framework)
[![npms score](https://badges.npms.io/rest-api-framework.svg)](https://npms.io/search?q=rest-api-framework)
[![wercker status](https://app.wercker.com/status/954921c2dd16f079ab64a7abbb9e3e1f/s/master "wercker status")](https://app.wercker.com/project/byKey/954921c2dd16f079ab64a7abbb9e3e1f)
[![codecov](https://codecov.io/gh/roshangade/rest-api-framework/branch/master/graph/badge.svg)](https://codecov.io/gh/roshangade/rest-api-framework)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/336e8b4ad77f483ab57cd8112006de87)](https://app.codacy.com/app/roshangade/rest-api-framework?utm_source=github.com&utm_medium=referral&utm_content=roshangade/rest-api-framework&utm_campaign=Badge_Grade_Dashboard)
[![Known Vulnerabilities](https://snyk.io//test/github/roshangade/rest-api-framework/badge.svg?targetFile=package.json)](https://snyk.io//test/github/roshangade/rest-api-framework?targetFile=package.json)
[![dependencies Status](https://david-dm.org/roshangade/rest-api-framework/status.svg)](https://david-dm.org/roshangade/rest-api-framework)
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
***
# How to use
```
const { app, route, server } = require('rest-api-framework');

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
server.listen(3000);
```

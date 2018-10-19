# Introduction
Simple REST API framework for Node.js

# Highlights
- No need to set app as global variable or export
- No need to use deprecated domain-context for error handler
- Extend server for more use
- Load config in app

# How to use
```
const { app, route, server } = require('rest-api-framework');
// app for configuration
app.set('test', 1);
app.get('test'); // 1

app.set('config', {
    'a': 1,
    'b': {
        'c': 3
    }
});

app.get('config.a'); // 1
app.get('config.b'); // {'c': 3}
app.get('config.b.c'); // 3

```

### Register middlewares
```
route.use((req, res) => {
    // set data
    req.set('test', 'simple');
    // for async return Promise
    return new Promise(resolve => setTimeout(resolve, 100));
});
```
### Route
```
route.get('/', (req, res) => {
    res.send({test: 1});
});

route.get('/page/:page/:limit?', (req, res) => {
    res.send(req.params);
});
```
:page - (:) required url parameter
:limit? - (:?) optional url paramater

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

## How to use other middlewares
For example: Body parser
```
const bodyParser = require('body-parser');
const util = require('util');

route.use(util.promisify(bodyParser.json()));
route.use(util.promisify(bodyParser.urlencoded({extended: true})));
```

### Error Handler
```
route.get('/error', (req, res) => {
    // throw custom error and set code
    return Promise.reject({ code: 'NOT_AUTHORIZED' })
});

//Catch error
route.error('NOT_AUTHORIZED', (err, req, res) => {
    res.status(401).send({ message: 'You are not authorized.',  });
});
```

### Uncaught Errors
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
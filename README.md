# Introduction
Simple REST API framework for Node.js

# How to use
```
const { app, router, server } = require('rest-api-framework');
// app for configuration
app.set('a', 1);
app.get('a');
```

### Register middlewares
```
router.use((req, res) => {
    // set data
    req.set('test', 'simple');
    // for async return Promise
    return new Promise(resolve => setTimeout(resolve, 100));
});
```
### Route
```
router.get('/', (req, res) => {
    res.send({test: 1});
});

router.get('/page/:page/:limit?', (req, res) => {
    res.send(req.params);
});
```
:page - (:) required url parameter
:limit? - (:?) optional url paramater

### Error Handler
```
router.get('/error', (req, res) => {
    // throw custom error and set code
    return Promise.reject({ code: 'NOT_AUTHORIZED' })
});

//Catch error
router.error('NOT_AUTHORIZED', (err, req, res) => {
    res.status(401).send({ message: 'You are not authorized.',  });
});
```

### Uncaught Errors
```
router.error((err, req, res) => {
    // common error handler
    res.status(500).send({ message: "Internal Server Error" });
});
```

### start server
```
server.listen(3000);
```
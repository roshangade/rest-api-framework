const { app, router, server } = require('./../target/main');
require('./user');

app.set('a', 1);

// ------------------ Middleware ---------------------
router.use((req, res) => {
    // middleware --> for async return Promise
    req.set('x', Date.now());
    return new Promise(resolve => setTimeout(resolve, 100));
});

// ----------------- Simple Route --------------------
router.get('/', (req, res) => {
    console.log('====>', req.get('x'));
    res.send({test: 1});
});

// ----------------- RegEx Route --------------------
router.get('/page/:page/:limit?', (req, res) => {
    res.send(req.params);
});

// ----------------- Custom Error --------------------
router.get('/error', (req, res) => {
    // throw custom error and set code
    return Promise.reject({ message: 'You are not authorized.', code: 'NOT_AUTHORIZED' })
});

// ----------------- Uncaught Error ----------------- 
router.get('/:a', (req, res) => {
    // uncaught error
    a
    res.send(req.params);
});

// ------------------ Custom Error Handler -------------
// code should be first parameter for user errors
router.error('NOT_AUTHORIZED', (err, req, res) => {
    // parse response 
    res.status(422).send({ message: err.message });
});

// ------------------ Uncaught Errors / User thrown errors -------------
router.error((err, req, res) => {
    console.log('error', err)
    // common error handler
    res.status(500).send({ message: err.message });
});

// start server
server.listen(3000);
console.log('server started...');
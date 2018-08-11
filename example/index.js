const { router, server } = require('./../main');
require('./user');

router.use((req, res) => {
    console.log('Middleware.......');
});

router.get('/', (req, res) => {
    res.send('aaaaa');
});

router.get('/error', (req, res) => {
    return Promise.reject({message: 'Custom error message', code: 'CUSTOM_ERROR'})
});

router.get('/:a', (req, res) => {
    a
    res.send(req.params);
});

router.error((err, req, res) => {
    res.status(500).send({message: err.message});
});

router.error('CUSTOM_ERROR', (err, req, res) => {
    res.status(422).send({message: err.message});
});

server.listen(3000);
console.log('server started...');
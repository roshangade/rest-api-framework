const {router} = require('./../main');

router.all('/user', (req, res) => {
    console.log('User Middleware.......')
});

router.get('/user', (req, res) => {
    res.send({user: 1});
});

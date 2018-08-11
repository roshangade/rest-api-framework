const { app, router } = require('./../main');

// kind of middlewar for all /user requests
router.all('/user', (req, res) => {
    return new Promise(resolve => setTimeout(resolve, 100));
});

router.get('/user', (req, res) => {
    console.log('----> ', app.get('a'));
    res.send({ user: 1 });
});

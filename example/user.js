const {route, app} = require('./../target/main');

// kind of middlewar for all /user requests
route.all('/user', (req, res) => {
    return new Promise(resolve => setTimeout(resolve, 100));
});

route.get('/user', (req, res) => {
    console.log('----> ', app.get('a'));
    res.send({ user: 1 });
});

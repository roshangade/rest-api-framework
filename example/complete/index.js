const http = require('http');
const {app, route, requestListener} = require('../../api')

const foo = route.for('/foo')

foo.use((req, res) => {
  console.log('foo middleware')
})

foo.get('/', (req, res) => {
  res.send(req.params)
})

foo.post('/1', (req, res) => {
  console.log(req.body)
  res.send('foo 1')
})

const _foo = foo.for('/:uid')

const bar = _foo.for('/bar')

bar.use((req, res) => {
  console.log('bar middleware')
})

bar.get('/', (req, res) => {
  res.send(req.params)
})

bar.post('/1', (req, res) => {
  console.log(req.body)
  res.send('bar 1')
})

app.set('config', {
  'a': 1,
  'b': {
    'c': 3,
  },
})

console.log('Config', app.get('config.b.c'))

// ------------------ Middleware ---------------------
route.use((req, res) => {
  // middleware --> for async return Promise
  ///return new Promise((resolve) => setTimeout(resolve, 100))
})

route.all('/*', (req, res) => {
  console.log('all middlewares....')
})

require('./user')

// ----------------- Simple Route --------------------
route.get('/', (req, res) => {
  //console.log(req.get('x'));
  res.send(req.params)
})

// ----------------- RegEx Route --------------------
route.get('/page/:page/:limit?', (req, res) => {
  res.send(req.params)
})

// ----------------- Custom Error --------------------
route.get('/error', (req, res) => {
  // throw custom error and set code
  return Promise.reject({message: 'You are not authorized.', code: 'NOT_AUTHORIZED'})
})

// ----------------- Uncaught Error -----------------
route.get('/:a', (req, res) => {
  // uncaught error
  a
  res.end(req.params)
})

// ------------------ Custom Error Handler -------------
// code should be first parameter for user errors
route.error('NOT_AUTHORIZED', (err, req, res) => {
  // parse response
  res.status(422).send({message: err.message})
})

// ------------------ Uncaught Errors / User thrown errors -------------
route.error((err, req, res) => {
  console.log('error', err)
  // common error handler
  res.status(500).send({message: err.message})
})

// start server
http.createServer(requestListener).listen(4000)
console.log('server started...')

const {route, app} = require('../../api')

const user = route.for('/users')
// kind of middleware for all /user requests
user.use((req, res) => {
  //return new Promise((resolve) => setTimeout(resolve, 100))
})

route.deferred('X', (data) => {
  console.log('xxxxxxxxxxxxxxxxxxxxxxxxxx', data)
})

route.deferred('Y', (data) => {
  throw new Error('a')
  console.log('yyyyyyyyyyyyyyyyyyyyyyyyyy', data)
})

route.deferred('Z', (data) => {
  return new Promise(resolve => {
    setTimeout(function() {
      console.log('zzzzzzzzzzzzzzzzzzzzzzzzz', data)
    }, 1000)
  })
})

user.get('/', (req, res) => {
  console.log('----> ', app.get('config.a'))
  req.defer('X', 'hello')
  req.defer('Y', 'world')
  req.defer('Z', 'from deferred')
  res.setHeader('Content-Type', 'plain/text')
  res.status(511).send('xxxx')
})

user.get('/:uid/profile', (req, res) => {
  console.log('----> ', app.get('config'))
  res.json({user: req.params.uid})
})

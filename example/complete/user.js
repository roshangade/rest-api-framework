const {route, app} = require('../../api')

const user = route.for('/users')
// kind of middleware for all /user requests
user.use((req, res) => {
  return new Promise((resolve) => setTimeout(resolve, 100))
})

user.get('/', (req, res) => {
  console.log('----> ', app.get('config.a'))
  res.send({users: []})
})

user.get('/:uid/profile', (req, res) => {
  console.log('----> ', app.get('config'))
  res.send({user: req.params.uid})
})

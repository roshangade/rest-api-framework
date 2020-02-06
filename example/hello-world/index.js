const http = require('http')
const {app, route} = require('../../api')

app.set('env', process.env.NODE_ENV || 'development')
app.set('port', process.env.PORT || 4000)

route.get('/', (req, res) => {
  res.send({'message': 'Hello, World!'})
})
const server = http.createServer(app.listener)
server.listen(app.get('port'))
console.log('server started successfully port:', app.get('port'), '& env:', app.get('env'))

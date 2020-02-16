const http = require('http')
const {app, route, requestListener} = require('../../api')

app.set('port', process.env.PORT || 4000)

route.get('/', (req, res) => {
  res.json({'message': 'Hello, World!'})
})

http.createServer(requestListener).listen(app.get('port'))

console.log('server started successfully port:', app.get('port'))

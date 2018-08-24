const http = require('http')
const config = require('./config')
const url = require('url')
// If we run this server by special port via terminal, that use received port number
// else use port from config.js file.
// e.g. port=9090 node index.js will be running at 9090 port
const port = process.env.port || config.port

let httpServer = http.createServer((req, res) => {
  // It's just my habbit.
  // I try to use more less args in functions as possible
  // In course videos we pass `res` via functions params in handlers
  // in this case we have to call fn by right context by `call` method
  this.res = res
  // I don't understand how to use new URL() and i decide to use url lib
  let parsedURL = url.parse(req.url, true)
  let clearPath = parsedURL.path.replace(/^\/|\/$/g, '')
  // choose handler
  let matchedRoute = router[clearPath] || router.notFound
  // executre function handler with this binding
  matchedRoute.call(this)
})

// curry function for receive two params and body of fn will be same in any cases
const commonlyResWith = statusCode => payload => {
  this.res.setHeader('Content-Type', 'application/json')
  this.res.writeHead(statusCode)
  this.res.end(payload)
}

// Handlers in router, i know that best practises is spread handlers and routes
const router = {
  hello: () => {
    let payloadString = JSON.stringify({ msg: 'It\'s just response in JSON format' })
    commonlyResWith(200)(payloadString)
  },
  notFound: () => {
    commonlyResWith(404)()
  }
}

httpServer.listen(port, () => { console.log(`Server is running on ${port} port`) })
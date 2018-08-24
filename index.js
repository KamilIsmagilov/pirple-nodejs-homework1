const http = require('http')
const config = require('./config')
const url = require('url')
const port = process.env.port || config.port

let httpServer = http.createServer((req, res) => {
  this.res = res
  let parsedURL = url.parse(req.url, true)
  let clearPath = parsedURL.path.replace(/^\/|\/$/g, '')
  let matchedRoute = router[clearPath] || router.notFound
  matchedRoute.call(this)
})

const commonlyResWith = statusCode => payload => {
  this.res.setHeader('Content-Type', 'application/json')
  this.res.writeHead(statusCode)
  this.res.end(payload)
}

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
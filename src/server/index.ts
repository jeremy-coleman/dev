import * as compression from 'compression'
import * as express from 'express'
import { createServer as createHTTPServer, Server } from 'http'
//import { createServer as createHTTPSServer, Server } from 'https'
//import { readFileSync } from 'fs'

//const IS_PROD = process.env.IS_PROD
const HTTP_PORT =  5000
//const HTTPS_PORT = 5001
const CLIENT_DIR = `${__dirname}/../dist/client`
//const ROOT = `http://localhost:${HTTP_PORT}/`

let app = express()
  .use(compression())
  .get('*', express.static(CLIENT_DIR))


  createHTTPServer(app)
    .on('info', (_: any) => console.info('HTTP server:', _))
    .listen(HTTP_PORT, function(this: Server) {
      this.emit('info', `Started dev HTTP server on port ${HTTP_PORT}...`)
    })


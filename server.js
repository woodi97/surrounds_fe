/* eslint-disable @typescript-eslint/no-var-requires */
const http = require('http')
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const express = require('express')

app.prepare().then(() => {
  const app = express()
  const server = http.createServer(app)

  app.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, () => {
    console.log(`> Ready on ${port}`)
  })
})

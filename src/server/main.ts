const fastify = require('fastify')()

const { SERVER_PORT = 3000 } = process.env

fastify.get("/api", (req, res) => {
  res.send("I'm the text back from the API !")
})

fastify.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))

process.on('exit', () => process.exit(0))



// const express = require("express")
// const app = express()
// const { SERVER_PORT = 3000 } = process.env

// app.get("/api", (req, res) => {
//   res.send("I'm the text back from the API !")
// })

// app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))

// process.on('exit', () => process.exit(0))
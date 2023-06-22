const http = require('http');

const app = require('./app');

const { mongoConnect } = require('./utils/mongo');

const PORT = process.env.PORT || 8000;



async function startServer() {
  const server = http.createServer(app)
  await mongoConnect()
  server.listen(PORT, ()=>{
    console.log(`listening on port: ${PORT}`)
  })
}

startServer();
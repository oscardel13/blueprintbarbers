const http = require('http');

const app = require('./app');

const { mongoConnect } = require('./utils/mongo');

const PORT = process.env.PORT || 8000;

const NETWORK_IP = process.env.NETWORK_IP_ADDRESS || null


async function startServer() {
  const server = http.createServer(app)
  await mongoConnect()
  server.listen(PORT, NETWORK_IP,()=>{
    console.log(`listening on port: ${PORT} \nnetwork: 192.168.86.44:3000`)
  })
}

startServer();
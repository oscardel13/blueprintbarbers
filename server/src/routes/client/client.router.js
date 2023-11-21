const express = require('express')
// const { checkIfTrainer, checkLoggedIn } = require('../utils/secruity');

const { 
    httpDeleteClient,
    httpGetClient,
    httpGetClients,
    httpUpdateClient
} = require('./client.controller')

const ClientAPI = express.Router();

ClientAPI.get('/', httpGetClients)
ClientAPI.get('/:id', httpGetClient)
ClientAPI.put('/:id', httpUpdateClient)
// ClientAPI.delete('/:id', httpDeleteClient)


module.exports = ClientAPI;
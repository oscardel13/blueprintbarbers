const express = require('express')
const { checkLoggedIn, checkIfAdmin } = require('../../utils/secruity');

// const { 

// } = require('./barber.controller')

const BarberAPI = express.Router();

// BarberAPI.get('/', checkIfAdmin, httpGetUsers)
// BarberAPI.get('/checkAdmin', checkIfAdmin, httpCheckIfAdmin)
// BarberAPI.get('/:id', checkLoggedIn, httpGetUser)
// BarberAPI.put('/:id', checkLoggedIn, httpUpdateUser)
// UserAPI.delete('/:id', httpDeleteUser) 


module.exports = BarberAPI;
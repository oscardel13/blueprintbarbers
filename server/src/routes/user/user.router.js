const express = require('express')
const { checkLoggedIn, checkIfAdmin } = require('../../utils/secruity');

const { 
    httpDeleteUser,
    httpGetUser,
    httpGetUsers,
    httpUpdateUser
} = require('./user.controller')

const UserAPI = express.Router();

UserAPI.get('/', checkIfAdmin, httpGetUsers)
UserAPI.get('/:id', checkLoggedIn, httpGetUser)
UserAPI.put('/:id', checkLoggedIn, httpUpdateUser)
// UserAPI.delete('/:id', httpDeleteUser)


module.exports = UserAPI;
const express = require('express')
// const { checkIfTrainer, checkLoggedIn } = require('../utils/secruity');

const { 
    httpDeleteUser,
    httpGetUser,
    httpGetUsers,
    httpUpdateUser
} = require('./user.controller')

const UserAPI = express.Router();

UserAPI.get('/', httpGetUsers)
UserAPI.get('/:id', httpGetUser)
UserAPI.put('/:id', httpUpdateUser)
// UserAPI.delete('/:id', httpDeleteUser)


module.exports = UserAPI;
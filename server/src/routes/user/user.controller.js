const { getUser,getUsers, updateUser, deleteUser } = require('../../models/user/user.data')

async function httpGetUsers(req, res){
    try{
        const users = await getUsers()
        res.status(200).json(users)
    }
    catch(err){
        res.status(500).json({message: "Server error"})
    }
}

async function httpGetUser(req, res){
    const SessionUser = req.user
    try{
        const user = await getUser(SessionUser.gid)
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json({message: "Server error"})
    }
}

/* 
TODO:
1. make sure params.id = session.user.id
*/
async function httpUpdateUser(req, res){
    try{
        const user = await updateUser(req.body)
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json({message: "Server error"})
    }
}

async function httpDeleteUser(req, res){
    const sessionUser = req.user
    try{
        const user = await deleteUser(sessionUser.gid)
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json({message: "Server error"})
    }
}

async function httpCheckIfAdmin(req, res){
    res.status(200).send(true)
}

module.exports = {
    httpGetUsers,
    httpGetUser,
    httpUpdateUser,
    httpDeleteUser,
    httpCheckIfAdmin
}


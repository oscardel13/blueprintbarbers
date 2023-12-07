const userCollection = require('./user.mongo')

const getUsers = async (skip, limit) => {
    return await userCollection.find().skip(skip).limit(limit).sort('name');
}

const getUser = async (id) => {
    return await userCollection.findOne({ gid: id })
}

const createUser = async (user) => {
    return await userCollection.findOneAndUpdate({gid:user.gid},user,{upsert: true})
}

const updateUser = async (user) => {
    return await userCollection.findOneAndUpdate({ gid: user.gid }, user, {returnDocument: 'after'})
}

const deleteUser = async (id) => {
    return await userCollection.deleteOne({ _id: id })
}

const checkAdmin = async (id) => {
    const user = await getUser(id)
    return user.accessLevel > 0
}


module.exports = {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    createUser,
    checkAdmin
}
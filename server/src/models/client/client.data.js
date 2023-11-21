const clientCollection = require('./client.mongo')

const getClients = async () => {
    return await clientCollection.find()
}

const getClient = async (id) => {
    return await clientCollection.findOne({ gid: id })
}

const createClient = async (client) => {
    return await clientCollection.findOneAndUpdate({gid:client.gid},client,{upsert: true})
}

const updateClient = async (id, client) => {
    return await productCollection.findOneAndUpdate({ _id: id }, { $set: client }, {returnDocument: 'after'})
}

const deleteClient = async (id) => {
    return await clientCollection.deleteOne({ _id: id })
}


module.exports = {
    getClients,
    getClient,
    updateClient,
    deleteClient,
    createClient
}
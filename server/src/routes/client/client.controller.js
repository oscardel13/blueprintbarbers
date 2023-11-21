const { getClient,getClients, updateClient, deleteClient } = require('../../models/client/client.data')

async function httpGetClients(req, res){
    try{
        const clients = await getClients()
        res.status(200).json(clients)
    }
    catch(err){
        res.status(500).json({message: "Server error"})
    }
}

async function httpGetClient(req, res){
    const user = req.user
    try{
        const client = await getClient(user.gid)
        res.status(200).json(client)
    }
    catch(err){
        res.status(500).json({message: "Server error"})
    }
}

/* 
TODO:
1. make sure params.id = session.user.id
*/
async function httpUpdateClient(req, res){
    try{
        const client = await updateClient(req.params.id, req.body)
        res.status(200).json(client)
    }
    catch(err){
        res.status(500).json({message: "Server error"})
    }
}

async function httpDeleteClient(req, res){
    try{
        const client = await deleteClient(req.params.id)
        res.status(200).json(client)
    }
    catch(err){
        res.status(500).json({message: "Server error"})
    }
}

module.exports = {
    httpGetClients,
    httpGetClient,
    httpUpdateClient,
    httpDeleteClient
}


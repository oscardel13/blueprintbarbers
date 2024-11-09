const axios = require('axios');

const barbersCollection = require('./barbers.mongo');

const getBarbers = async () => {
    return await barbersCollection.find({})
}

const getBarber = async (id) => {
    return await barbersCollection.findOne({ gid: id })
}

const addBarber = async (barber) => {
    return await barbersCollection.insertOne(barber)
}

const updateBarber = async (barber) => {
    return await barbersCollection.findOneAndUpdate({ gid: barber.gid }, barber, {returnDocument: 'after'})
}

const instagramPosts = async (key) =>{ 
    userData = null
    try{
        userData = axios
            .get(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption&limit=6&access_token=${key}`)
            .then((res) => {
                console.log(res.data.data)
                return res.data.data
            })
      } catch (err) {
        //   console.log('error', err)
        return [] 
      }
      return userData

}

module.exports = {
    getBarbers,
    getBarber,
    addBarber,
    updateBarber,
    instagramPosts
}
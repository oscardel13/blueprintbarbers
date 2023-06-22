const axios = require('axios');

const barbersCollection = require('./barbers.mongo');

const getBarbersList = async () => {
    return await barbersCollection.find({})
}

const instagramPosts = async (key) =>{ 
    userData = null
    try{
        userData = axios
            .get(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption&limit=6&access_token=${key}`)
            .then((resp) => {
                return resp.data.data
            })
      } catch (err) {
          console.log('error', err)
      }
      return userData

}

module.exports = {
    getBarbersList,
    instagramPosts
}
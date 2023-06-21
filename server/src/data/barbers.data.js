const axios = require('axios');

require('dotenv').config();

const barbersList = [
    {
        id: 0,
        name: "Enrique",
        nickname: "Enrique the Barber",
        bio: "The one and only",
        profilePicUrl: "enrique-profile-picture.jpg",
        instagramUrl: "https://www.instagram.com/enriquethebarber__/",
        booksyUrl: "https://booksy.com/en-us/dl/show-business/382802",
        instagram: process.env.INSTAGRAM_OSCAR_CODE
    },
    {
        id: 1,
        name: "Luis",
        nickname: "frezcoo",
        bio: "It is what it is",
        profilePicUrl: "luis-profile-picture.jpg",
        instagramUrl: "https://www.instagram.com/frezcoo/",
        booksyUrl: "https://booksy.com/en-us/467029_frezcoo_barber-shop_134761_denver",
        instagram: process.env.INSTAGRAM_OSCAR_CODE
    },
    {
        id: 2,
        name: "Javier",
        nickname: "Artist Fades",
        bio: "I got jokes for you",
        profilePicUrl: "javier-profile-picture.jpg",
        instagramUrl: "https://www.instagram.com/artist_fadez/",
        booksyUrl: "https://booksy.com/en-us/500075_javier-guero-barber_barber-shop_134761_denver#ba_s=sh_1",
        instagram: process.env.INSTAGRAM_OSCAR_CODE
    },
    {
        id: 3,
        name: "Tony",
        nickname: "tonyblurrz",
        bio: "Keep it fresh with a fade",
        profilePicUrl: "tony-profile-picture.jpg",
        instagramUrl: "https://www.instagram.com/tonyblurrz/",
        booksyUrl: "https://booksy.com/en-us/602202_tony-blurrz_barber-shop_134761_denver#ba_s=sh_",
        instagram: process.env.INSTAGRAM_OSCAR_CODE
    },
    {
        id: 4,
        name: "Elvin",
        nickname: "astro_blendzz",
        bio: "The one and only",
        profilePicUrl: "elvin-profile-picture.jpg",
        instagramUrl: "https://www.instagram.com/astro_blendzz/",
        booksyUrl: "https://booksy.com/en-us/497516_astro-blendzz_barber-shop_134761_denver#ba_s=sr_1",
        instagram: process.env.INSTAGRAM_OSCAR_CODE
    }
]

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
    barbersList,
    instagramPosts
}
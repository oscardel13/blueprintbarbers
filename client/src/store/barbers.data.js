const barbersType = {
    name: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: true
    },
    instagramUrl: {
        type: String,
        required: true
    },
    booksyUrl: {
        type: String,
        required: true
    },
    instagramKey: {
        type: String,
        required: true
    }
}

export const barbersList = [
    {
        id: 0,
        name: "Enrique",
        nickname: "Enrique the Barber",
        bio: "The one and only",
        profilePicUrl: "enrique-profile-picture.jpg",
        instagramUrl: "https://www.instagram.com/enriquethebarber__/",
        booksyUrl: "https://booksy.com/en-us/dl/show-business/382802",
        instagramKey: ""
    },
    {
        id: 1,
        name: "Luis",
        nickname: "frezcoo",
        bio: "It is what it is",
        profilePicUrl: "luis-profile-picture.jpg",
        instagramUrl: "https://www.instagram.com/frezcoo/",
        booksyUrl: "https://booksy.com/en-us/467029_frezcoo_barber-shop_134761_denver",
        instagramKey: ""
    },
    {
        id: 2,
        name: "Javier",
        nickname: "Artist Fades",
        bio: "I got jokes for you",
        profilePicUrl: "javier-profile-picture.jpg",
        instagramUrl: "https://www.instagram.com/artist_fadez/",
        booksyUrl: "https://booksy.com/en-us/500075_javier-guero-barber_barber-shop_134761_denver#ba_s=sh_1",
        instagramKey: ""
    },
    {
        id: 3,
        name: "Tony",
        nickname: "tonyblurrz",
        bio: "Keep it fresh with a fade",
        profilePicUrl: "tony-profile-picture.jpg",
        instagramUrl: "https://www.instagram.com/tonyblurrz/",
        booksyUrl: "https://booksy.com/en-us/602202_tony-blurrz_barber-shop_134761_denver#ba_s=sh_",
        instagramKey: ""
    },
    {
        id: 4,
        name: "Elvin",
        nickname: "astro_blendzz",
        bio: "Elvin... and the chipmunks",
        profilePicUrl: "elvin-profile-picture.jpg",
        instagramUrl: "https://www.instagram.com/astro_blendzz/",
        booksyUrl: "https://booksy.com/en-us/497516_astro-blendzz_barber-shop_134761_denver#ba_s=sr_1",
        instagramKey: ""
    }
]
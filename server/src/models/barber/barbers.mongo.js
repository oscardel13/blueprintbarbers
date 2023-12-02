const mongoose = require('mongoose');
 
const barberSchema = new mongoose.Schema({
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
    images: {
        type: [String],
        required: true,
        default: []
    },
    instagramUrl: {
        type: String,
        required: true
    },
    booksyUrl: {
        type: String,
        required: true
    },
    instagram: {
        type: String,
        required: true
    },
    location: {  //FOR LATER TO CREATE MAPS
        type: String,
    }   
})

module.exports = mongoose.model('barber', barberSchema);
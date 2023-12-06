const { userPassport, trainerPassport } = require('../../utils/secruity');

const authRouter = require('express').Router();

require('dotenv').config();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

authRouter.get('/google', 
    userPassport.authenticate('google', {
        scope: ['email', "profile"]
    }))

authRouter.get('/google/callback' , 
    userPassport.authenticate('google', {
        failureRedirect: '/auth/failure',
        successRedirect: `${CLIENT_URL}/`
    }),
);

// Need a better system than just send
authRouter.get('/failure', (req,res)=>res.send('Failed to log in'))

authRouter.get('/logout' , (req,res)=>{
    console.log('logging out')
    req.logout();
    res.redirect(`${CLIENT_URL}`) //dev
})

module.exports = authRouter
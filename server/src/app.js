const express = require('express');
const cors = require('cors');
const morgan = require("morgan");
const helmet = require("helmet");
const path = require('path');
const api = require('./routes/api');

const { getBarbersList, instagramPosts } = require('./models/barber/barbers.data');

const cookieSession = require('cookie-session');
const { config, clientPassport } = require("./utils/secruity");

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(cors({
    origin: ['http://192.168.86.44:3000','https://192.168.86.44:3000','http://localhost:3000', 'https://blueprintbarbers.co', 'https://blueprintbarbers.oscarshub.com'],
    credentials: true
}));

app.use(cookieSession({
  name: 'session',
  maxAge: config.COOKIE_MAX_AGE,
  keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
  sameSite: false,
  // secure: true // Set to true if using HTTPS
}));
app.use(clientPassport.initialize());

app.use(clientPassport.session());

app.use(morgan("combined"));

app.use((req, res, next) => {
    const start = Date.now();
    next();
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
  });

  app.use(express.json());

  app.use('/', api)

  app.get('/api/barbers', async (req,res) => {
    const barbersList = await getBarbersList()
    
    const barbers = await  Promise.all(barbersList.map(async el => {
      try{
        posts = await instagramPosts(el.instagram)
      }
      catch{
        posts = []
      }
        const updatedEl = {...el.toObject(), instagram: posts}
        console.log(el.name)
        return updatedEl
    }))

    res.status(200).json({barbers : barbers});
  });

  app.use(express.static(path.join(__dirname, ".." , 'public')));

  app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname,'..','public','index.html'));
  });  

module.exports = app;
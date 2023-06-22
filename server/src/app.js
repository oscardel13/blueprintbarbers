const express = require('express');
const cors = require('cors');
const morgan = require("morgan");
const helmet = require("helmet");
const path = require('path');

const { getBarbersList, instagramPosts } = require('./models/barbers.data');

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(cors({
    origin: ['http://localhost:3001','http://localhost:3000', 'http://192.168.86.44:3000/']
}));

app.use(morgan("combined"));

app.use((req, res, next) => {
    const start = Date.now();
    next();
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
  });

  app.use(express.json());

//   app.use('/', api)

  app.get('/api/barbers', async (req,res) => {
    const barbersList = await getBarbersList()
    // console.log(barbersList)
    const barbers = await  Promise.all(barbersList.map(async el => {
        posts = await instagramPosts(el.instagram)
        // console.log(el.instagram)
        const updatedEl = {...el.toObject(), instagram: posts}
        console.log(updatedEl)
        return updatedEl
    }))
    res.status(200).json({barbers : barbers});
  });

  app.use(express.static(path.join(__dirname, ".." , 'public')));

  app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname,'..','public','index.html'));
  });  

module.exports = app;
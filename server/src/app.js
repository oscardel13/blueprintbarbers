const express = require('express');
const cors = require('cors');

const { barbersList, instagramPosts } = require('./data/barbers.data');

const app = express();

app.use(cors({
    origin: ['http://localhost:3001','http://localhost:3000', 'http://192.168.86.44:3000/']
}));

app.use((req, res, next) => {
    const start = Date.now();
    next();
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
  });

  app.use(express.json());

//   app.use('/', api)

  app.get('/barbers', async (req,res) => {
    const barbers = await  Promise.all(barbersList.map(async el => {
        posts = await instagramPosts(el.instagram)
        el = {...el, instagram: posts}
        return el
    }))
    res.status(200).json({barbers : barbers});
  });

module.exports = app;
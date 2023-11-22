const express = require('express')
const multer = require('multer'); 
// const { checkIfTrainer, checkLoggedIn } = require('../utils/secruity');

const storage = multer.memoryStorage(); // You can customize storage as needed
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      // Implement file type and size filtering if needed
      cb(null, true); // Allow all files for now
    },
  });

const { 
    httpArchiveProduct, 
    httpCreateProduct, 
    httpDeleteProduct, 
    httpGetProducts,
    httpGetProduct,
    httpUpdateProduct,
    httpPublishProduct,
    httpGetArchivedProducts,
    httpGetPublishedProducts
 } = require('./product.controller')

const ProductAPI = express.Router();

ProductAPI.get('/', httpGetProducts)
ProductAPI.get('/archives', httpGetArchivedProducts)
ProductAPI.get('/published', httpGetPublishedProducts)
ProductAPI.get('/:name', httpGetProduct)
//ADMIN/TRAINER ONLY
ProductAPI.post('/', upload.fields([
    { name: 'user', maxCount: 1 },
    { name: 'images', maxCount: 10}
  ]),httpCreateProduct) 
ProductAPI.put('/:id', httpUpdateProduct)
ProductAPI.delete('/:id', httpDeleteProduct)
ProductAPI.put('/archives/:id', httpArchiveProduct)
ProductAPI.put('/publish/:id', httpPublishProduct)

module.exports = ProductAPI;
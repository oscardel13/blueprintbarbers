const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, archiveProduct, publishProduct } = require("../../models/product/product.data");
const { uploadObjectsToStatic } = require("../../utils/aws");

async function httpGetProducts(req,res){
    try{
        const products = await getProducts();
        return res.status(200).json(products);
    }
    catch(e){
        return res.status(500).json({message:e.message});
    }
    
}

async function httpGetProduct(req,res){
    try{
        const product = await getProduct(req.params.name);
        return res.status(200).json(product);
    }
    catch(e){
        return res.status(500).json({message:e.message});
    }
}

/* 
TODO
1. Create the items with the sizes.
*/
async function httpCreateProduct(req,res){
    const { session, body, files } = req;
    product = JSON.parse(body.form);
    const sizes = []
    for (const key of Object.keys(product.sizes)){
        if (product.sizes[key] > 0){
            sizes.push(key)
        }
        
    }
    product.sizes = sizes
    try{
        product.images = await processImages(product, files.images)
        console.log(product)
        const productRes = await createProduct(product);
        return res.status(200).json(productRes);
        // return res.status(200).json("product");
    }
    catch(e){
        return res.status(500).json({message:e.message});
    }
}

async function processImages(product, files){
    const imagesBuffer = []
    for (let j = 0; j < files.length; j++){
        i = files.length - j - 1;
        s3Path = `products/${product.name}/images/${j.toString()}.jpg` //edit so checked mimetype
        imagesBuffer.push({Key: s3Path,Body: files[i].buffer})
    }
    const imageRes = await uploadObjectsToStatic(imagesBuffer)
    const images = []
    for (const res of imageRes){
        images.push(res.Location)
    }
    return images
}

async function httpUpdateProduct(req,res){
    const product = req.body;
    if (product._id != req.params.id){
        return res.status(400).json({message:"Invalid product id"});
    }
    product.updatedAt = Date.now();
    console.log(product)
    try{
        const updatedProduct = await updateProduct(req.params.id,product);
        return res.status(200).json(updatedProduct);
    }
    catch(e){
        return res.status(500).json({message:e.message});
    }
}

async function httpDeleteProduct(req,res){
    try{
        const product = await deleteProduct(req.params.id);
        return res.status(200).json(product);
    }
    catch(e){
        return res.status(500).json({message:e.message});
    }
}

async function httpArchiveProduct(req,res){
    try{
        const product = await archiveProduct(req.params.id);
        return res.status(200).json(product);
    }
    catch(e){
        return res.status(500).json({message:e.message});
    }
}

async function httpPublishProduct(req,res){
    try{
        const product = await publishProduct(req.params.id);
        return res.status(200).json(product);
    }
    catch(e){
        return res.status(500).json({message:e.message});
    }
}

module.exports = {
    httpGetProducts,
    httpGetProduct,
    httpCreateProduct,
    httpUpdateProduct,
    httpDeleteProduct,
    httpArchiveProduct,
    httpPublishProduct
}
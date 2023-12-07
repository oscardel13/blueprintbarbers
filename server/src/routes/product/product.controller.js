const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, archiveProduct, publishProduct } = require("../../models/product/product.data");
const { getUser } = require("../../models/user/user.data");
const { uploadObjectsToStatic } = require("../../utils/aws");
const { createProductItemList, processImages, createReducedSizeList } = require("./product.helper");
const { getPagination } = require("../../utils/query");

async function httpGetProducts(req,res){
    const { skip, limit } = getPagination(req.query);
    try{
        const products = await getProducts(skip, limit);
        return res.status(200).json(products);
    }
    catch(e){
        return res.status(500).json({message:e.message});
    }
    
}

// MAYBE ADD LOGIC TO DATA INSTEAD OF HERE
async function httpGetArchivedProducts(req, res){
    try{
        const products = await getProducts();
        const archivedProducts = products.filter(product => product.archived === true)
        return res.status(200).json(archivedProducts);
    }
    catch(e){
        return res.status(500).json({message:e.message});
    }  
  
}

// MAYBE ADD LOGIC TO DATA INSTEAD OF HERE
async function httpGetPublishedProducts(req, res){
    try{
        const products = await getProducts();
        const publishedProducts = products.filter(product => product.published === true)
        return res.status(200).json(publishedProducts);
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

async function httpCreateProduct(req,res){
    const { session, body, files } = req;
    product = JSON.parse(body.form);
    const reducedSizes = createReducedSizeList(product.sizes)
    const Items = createProductItemList(product.sizes)
    product.name = product.name.replace(/\s+$/, ''); // deletes trailing whitespace
    product.sizes = reducedSizes
    product.items = Items
    try{
        if (files && (Array.isArray(files) ? files.length > 0 : Object.keys(files).length > 0)) //checks files exist
            product.images = await processImages(product, files.images)
        else{
            delete product.images;
        }
        const productRes = await createProduct(product);
        return res.status(200).json(productRes);
    }
    catch(e){
        return res.status(500).json({message:e.message});
    }
}

async function httpUpdateProduct(req,res){
    const { session, body, files } = req;
    product = JSON.parse(body.form);
    if (product.name != req.params.id){
        return res.status(400).json({message:"Invalid product id"});
    }
    product.updatedAt = Date.now();
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
        if (product.error){
            return res.status(400).json(product);
        }
        return res.status(200).json(product);
    }
    catch(e){
        return res.status(500).json({message:e.message});
    }
}

async function httpGetItem(req,res){
    try{
        const product = await getProduct(req.params.name);
        const item = product.items.find(item => {
            return String(item._id) === req.params.id
        });
        if (!item){
            return res.status(400).json({message:"Invalid item id"});
        }
        const user = await getUser(item.owner);
        delete product.items
        resData = {
            product: product,
            item: {
                size: item.size,
                owner: user? user.name : null, //CHANGE LATER: ADD SETTING WHERE USER CAN CHOOSE HOW TO DISPLAY NAME 
            }
        }
        return res.status(200).json(resData);
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
    httpPublishProduct,
    httpGetArchivedProducts,
    httpGetPublishedProducts,
    httpGetItem
}
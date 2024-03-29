const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, archiveProduct, publishProduct } = require("../../models/product/product.data");
const { getUser } = require("../../models/user/user.data");
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

async function httpGetProductAdmin(req,res){
    try{
        const product = await getProduct(req.params.name);
        return res.status(200).json(product);
    }
    catch(e){
        return res.status(500).json({message:e.message});
    }
}

async function httpGetProductStore(req,res){
    try{
        const product = await getProduct(req.params.name);
        const stock = {};
        for (let i = 0; i < product.items.length; i++) {
            const item = product.items[i];
            const { size } = item;
            if(!stock[size]) {
                stock[size] = 0;
            }
            if(!item.owner) {
                stock[size]++; 
            }
        }
        const modifiedProduct = {
            _id: product._id,
            name: product.name,
            description: product.description,
            images: product.images,
            pricing: product.pricing,
            stock: stock,
            published: product.published,
            
        }
        return res.status(200).json(modifiedProduct);
    }
    catch(e){
        return res.status(500).json({message:e.message});
    }
}
/* TODO:
    1. Build Way to delete Images

*/

async function httpCreateProduct(req,res){
    const { body, files } = req;
    product = JSON.parse(body.form);
    product.items = createProductItemList(product.sizes)
    product.sizes = createReducedSizeList(product.sizes)
    product.name = product.name.replace(/\s+$/, ''); // deletes trailing whitespace
    try{
        product.images = await processImages(product, files.images)
        const productRes = await createProduct(product);
        return res.status(200).json(productRes);
    }
    catch(e){
        return res.status(500).json({message:e.message});
    }
}

async function httpUpdateProduct(req,res){
    const { session, body, files } = req;
    let product;
    if (body.form === undefined){
        product = body
    }
    else{
        product = JSON.parse(body.form);
    }
    if (product.name != req.params.name){

        return res.status(400).json({message:"Invalid product id"});
    }

    product.updatedAt = Date.now();
    try{
        product.images = await processImages(product, files.images)
        const updatedProduct = await updateProduct(req.params.name,product);
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
        const modifiedProduct = {
            name: product.name,
            description: product.description,
            images: product.images,
            pricing: product.pricing,
            published: product.published,
        }
        resData = {
            product: modifiedProduct,
            item: {
                _id: item._id,
                size: item.size,
                owner: user? user.name : null
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
    httpGetProductAdmin,
    httpGetProductStore,
    httpCreateProduct,
    httpUpdateProduct,
    httpDeleteProduct,
    httpArchiveProduct,
    httpPublishProduct,
    httpGetArchivedProducts,
    httpGetPublishedProducts,
    httpGetItem
}
const productCollection = require('./product.mongo')

// TODO: make 3 different ones! one for all products, one for published, one for archived
const getProducts = async (skip, limit) => {
    return await productCollection.find().skip(skip).limit(limit);
}

/*
    TODO: make 2 different ones! one for store and one for admin
    Store filter out to just name, description, category, pricing, sizes, images
*/
const getProduct = async (name) => {
    return await productCollection.findOne({ name: name })
}

const createProduct = async (product) => {
    return await productCollection.create(product);
}

const updateProduct = async (name, product) => {
    return await productCollection.findOneAndUpdate({ name: name }, product, {returnDocument: 'after'})
}

const deleteProduct = async (id) => {
    return await productCollection.deleteOne({ _id: id })
}

const archiveProduct = async (name) => {
    product = await getProduct(name);
    return await productCollection.findOneAndUpdate({ name: name }, { archived: !product.archived, published: false }, {returnDocument: 'after'})
}

const publishProduct = async (name) => {
    product = await getProduct(name);
    if (product.archived === true){
        return {
            error: 'Product is already archived'
        }
    }
    return await productCollection.findOneAndUpdate({ name: name }, { published: !product.published }, {returnDocument: 'after'})
}  

module.exports = {
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    archiveProduct,
    createProduct,
    publishProduct
}
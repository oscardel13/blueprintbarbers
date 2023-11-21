const { options } = require('../../routes/api')
const productCollection = require('./product.mongo')

// TODO: make 3 different ones! one for all products, one for published, one for archived
const getProducts = async () => {
    return await productCollection.find()
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

const updateProduct = async (id, product) => {
    return await productCollection.findOneAndUpdate({ _id: id }, { $set: product }, {returnDocument: 'after'})
}

const deleteProduct = async (id) => {
    return await productCollection.deleteOne({ _id: id })
}

const archiveProduct = async (id) => {
    product = await getProduct(id);
    archived = product.archived;
    return await productCollection.findOneAndUpdate({ _id: id }, { archived: !product.archived }, {returnDocument: 'after'})
}

const publishProduct = async (id) => {
    product = await getProduct(id);
    return await productCollection.findOneAndUpdate({ _id: id }, { published: !product.published }, {returnDocument: 'after'})
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
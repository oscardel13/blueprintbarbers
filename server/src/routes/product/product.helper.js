const { uploadObjectsToStatic, uploadToS3Static } = require("../../utils/aws");

function createProductItemList(sizes) {
    const productItemList = [];
    for (const size in sizes) {
        for (let i = 0; i < sizes[size]; i++){
            productItemList.push({size: size})
        }
    }
    return productItemList
} 

function createReducedSizeList(sizes){
    const reducedSizeList = []
    for (const key of Object.keys(sizes)){
        if (product.sizes[key] > 0){
            reducedSizeList.push(key)
        }
    }
    return reducedSizeList
}

/* TODO:
    1. Build Way to delete Images

*/
async function processImages(product, files){
    let fileIndex = 0
    const updatedImages = product.images
    for (let i=0;i<product.images.length;i++){
        const image = product.images[i]
        if (typeof image === 'string'){
            updatedImages[i] = product.images[i]
        }
        else{
            console.log(files[fileIndex])
            let s3Path = `products/${product.name}/images/${files[fileIndex].originalname}` //edit so checked mimetype
            const res = await uploadToS3Static(s3Path, files[fileIndex].buffer)
            updatedImages[i] = res.Location
            fileIndex += 1
        }
    }
    return updatedImages
}

module.exports = {
    createProductItemList,
    processImages,
    createReducedSizeList
}
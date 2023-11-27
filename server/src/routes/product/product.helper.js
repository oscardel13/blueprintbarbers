
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
    1. check if it's a new image
        a. if new image check current index image path and upate it with new image (s3 upload) if its appended use {index}.jpg
        b. if not new image (its a url type string) just update with new url

*/
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

module.exports = {
    createProductItemList,
    processImages,
    createReducedSizeList
}
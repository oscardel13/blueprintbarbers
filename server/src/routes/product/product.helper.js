const { uploadObjectsToStatic, uploadToS3Static } = require("../../utils/aws");

function createProductItemList(sizes) {
  const productItemList = [];
  for (const size in sizes) {
    for (let i = 0; i < sizes[size]; i++) {
      productItemList.push({ size: size });
    }
  }
  return productItemList;
}

function createReducedSizeList(sizes) {
  const reducedSizeList = [];
  for (const key of Object.keys(sizes)) {
    if (product.sizes[key] > 0) {
      reducedSizeList.push(key);
    }
  }
  return reducedSizeList;
}

module.exports = {
  createProductItemList,
  createReducedSizeList,
};

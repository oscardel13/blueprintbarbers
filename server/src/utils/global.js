const { uploadToS3Static } = require("../utils/aws");

/* TODO:
    1. Build Way to delete Images

*/

async function uploadImagesToS3(images, files, path = "unknown/") {
  let fileIndex = 0;
  const updatedImages = images;
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    // images unchanged
    if (typeof image === "string") {
      return images;
    }
    // image already uploaded
    if (image?.url?.startsWith("http")) {
      updatedImages[i] = images[i].url;
    } else {
      let s3Path = `${path}/images/${files[fileIndex].originalname}`; //edit so checked mimetype
      const res = await uploadToS3Static(s3Path, files[fileIndex].buffer);
      updatedImages[i] = res.Location;
      fileIndex += 1;
    }
  }
  return updatedImages;
}

module.exports = {
  uploadImagesToS3,
};

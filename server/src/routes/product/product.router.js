const express = require("express");
const multer = require("multer");
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
  httpGetProductAdmin,
  httpGetProductStore,
  httpUpdateProduct,
  httpPublishProduct,
  httpGetArchivedProducts,
  httpGetPublishedProducts,
  httpGetItem,
} = require("./product.controller");

const { checkIfAdmin } = require("../auth/auth.user");

const ProductAPI = express.Router();

ProductAPI.get("/", httpGetProducts);
ProductAPI.get("/archives", httpGetArchivedProducts);
ProductAPI.get("/published", httpGetPublishedProducts);
ProductAPI.get("/:name", httpGetProductAdmin);
ProductAPI.get("/store/:name", httpGetProductStore);
ProductAPI.get("/:name/:id", httpGetItem);

//ADMIN/TRAINER ONLY
ProductAPI.post(
  "/",
  checkIfAdmin,
  upload.fields([
    { name: "form", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  httpCreateProduct
);
ProductAPI.put(
  "/:name",
  checkIfAdmin,
  upload.fields([
    { name: "form", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  httpUpdateProduct
);
ProductAPI.delete("/:id", checkIfAdmin, httpDeleteProduct);
ProductAPI.put("/archives/:id", checkIfAdmin, httpArchiveProduct);
ProductAPI.put("/publish/:id", checkIfAdmin, httpPublishProduct);

module.exports = ProductAPI;

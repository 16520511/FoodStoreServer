const express = require("express");
const path = require("path");
const multer = require("multer");

const product = require("../../models/product")

const router = express.Router();

//Upload image for food products
const productStorage = multer.diskStorage({
    destination: "./public/uploads/products",
    filename: function(req, file, cb){
       cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
});
 
const productUpload = multer({
    storage: productStorage,
    limits:{fileSize: 1000000},
}).single("file");

router.post('/product', productUpload, function (req, res, next) {
    const productId = req.body.productId;
    const fileName = res.req.file.filename;
    product.findByPk(parseInt(productId)).then(product => {
        product.image = fileName;
        product.save();
    })
})
/*****************************************/

module.exports = router;


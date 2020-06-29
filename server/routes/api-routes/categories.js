const Product = require("../../models/product");

const express = require("express");
const router = express.Router();

router.get("/:id/products", (req, res) => {
    Product.findAll({ raw: true, where: { categoryId: req.params.id } })
    .then(products => res.send(products))
    .catch(err => res.status(404))
})

module.exports = router;
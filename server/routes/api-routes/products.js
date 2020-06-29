const Product = require("../../models/product");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    let condition = { raw: true }
    if (req.query.onSale !== undefined && req.query.onSale === "true") {
        let onSale = { onSale: true }
        condition = { raw: true, 
            where: onSale
        }
    }

    Product.findAll(condition)
    .then(products => res.send(products))
    .catch(err => res.status(404))
})

module.exports = router;
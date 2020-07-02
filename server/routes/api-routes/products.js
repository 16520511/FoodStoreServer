const Product = require("../../models/product");
const Category = require("../../models/category");

const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

router.get("/", (req, res) => {
    let condition = { raw: true }
    console.log(req.query.category)
    if (req.query.category !== undefined) {
        let title = req.query.category;
        title = title[0].toUpperCase() + title.slice(1);
        console.log(title);
        Category.findOne({ where: {title: title} }).then(category => {
            let condition = { raw: true,
            where: {categoryId: category.id} };

            Product.findAll(condition)
            .then(products => res.send(products))
            .catch(err => res.status(404))
            
        }).catch(err => res.status(404))
    }
    else if (req.query.onSale !== undefined && req.query.onSale === "true") {
        let onSale = { onSale: true }
        condition = { raw: true, 
            where: onSale
        }
        Product.findAll(condition)
        .then(products => res.send(products))
        .catch(err => res.status(404))
    }
    else if (req.query.q !== undefined) {
        condition = { raw: true, 
            where: {name: {[Op.iLike]: "%" + req.query.q + "%"}}
        }
        Product.findAll(condition)
        .then(products => res.send(products))
        .catch(err => res.status(404))
    }
    else
        Product.findAll(condition)
        .then(products => res.send(products))
        .catch(err => res.status(404))
})

module.exports = router;
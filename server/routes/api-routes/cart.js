const express = require("express");
const router = express.Router();

const bodyParser = require('body-parser');
const Product = require("../../models/product");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }))

router.post("/", (req, res) => {
    let cart = req.body.cart;
    if (cart !== undefined) {
        req.session.cart = cart;
        req.session.save(() => {
            console.log(req.session);
            res.send(req.session);
        });
    }

    res.status(400);
})

router.post("/add-to-cart", (req, res) => {
    let productId = req.body.productId;
    if(req.session.cart === undefined)
        req.session.cart = [{productId: productId, quantity: 1}]
    else {
        let productAlreadyInCart = false;
        for (let i = 0; i < req.session.cart.length; i++) {
            if (req.session.cart[i].productId === productId) {
                req.session.cart[i].quantity++;
                productAlreadyInCart = true;
                break;
            }
        }
        if (!productAlreadyInCart)
            req.session.cart.push({productId: productId, quantity: 1});
    }
        
    req.session.save(() => {
        console.log(req.session);
        res.send(req.session);
    });
})

router.get("/cart-items", (req, res) => {
    let productIds = [];
    for (let i = 0; i < req.session.cart.length; i++) 
        productIds.push(req.session.cart[i].productId);

    Product.findAll({ raw: true, where: { id: productIds }})
    .then(products => {
        let result = []
        for (let i = 0; i < products.length; i++)
            for (let j = 0; j < req.session.cart.length; j++)
                if (req.session.cart[j].productId === products[i].id) {
                    products[i].quantity = req.session.cart[j].quantity;
                    break;
                }

        res.send(products);
    })
    .catch(err => res.send(err));
})

module.exports = router;
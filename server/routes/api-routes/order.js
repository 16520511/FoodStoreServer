const Order = require("../../models/order");

const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())


router.put("/", (req, res) => {
    console.log(req.body);

    Order.create({ customerInfo: req.body.customerInfo, orderContent: req.body.orderContent, total: req.body.total, confirm: false, deliver: false }).then(order => {
            res.send(order);
            req.session.cart = undefined;
            req.session.save();
        })
    .catch(err => res.send(err))
})

module.exports = router;
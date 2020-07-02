const express = require("express");
const cors = require("cors");
const sequelize = require("../dbConn");
const session = require("express-session");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const uploadApi = require("./api-routes/upload")
const cartApi = require("./api-routes/cart")
const productApi = require("./api-routes/products");
const categoryApi = require("./api-routes/categories");
const orderApi = require("./api-routes/order");

const router = express.Router();

router.use(cors({ origin: 'http://localhost:8080' , credentials : true}));

const sessionStore = new SequelizeStore({
    db: sequelize
})

router.use(session({
    secret: "helloworld123",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000*60*60, secure: false },
    checkExpirationInterval: 0,
    unset: "destroy"
}))

router.get("/check-session", (req, res) => {
    res.send(req.session);
})

router.use("/upload", uploadApi);
router.use("/cart", cartApi);
router.use("/products", productApi);
router.use("/categories", categoryApi);
router.use("/order", orderApi);

module.exports = router;


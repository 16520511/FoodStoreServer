const Sequelize = require("sequelize");
const Model = Sequelize.Model;
const sequelize = require("../dbConn");

class Order extends Model {}

Order.init({
    customerInfo: Sequelize.STRING,
    orderContent: Sequelize.STRING,
    total: Sequelize.STRING,
    confirm: Sequelize.BOOLEAN,
    deliver: Sequelize.BOOLEAN,
}, { sequelize, modelName: "order" });

module.exports = Order;
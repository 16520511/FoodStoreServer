const Sequelize = require("sequelize");
const Model = Sequelize.Model;
const sequelize = require("../dbConn");

class Category extends Model {}

Category.init({
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    icon: Sequelize.STRING
}, { sequelize, modelName: "category" });

module.exports = Category;
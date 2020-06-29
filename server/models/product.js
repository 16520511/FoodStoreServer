const Sequelize = require("sequelize");
const Model = Sequelize.Model;
const sequelize = require("../dbConn");

const Category = require("./category");

class Product extends Model {}

Product.init({
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    price: Sequelize.FLOAT,
    salePrice: Sequelize.FLOAT,
    onSale: Sequelize.BOOLEAN,
    image: Sequelize.STRING,
    categoryId: {
        type: Sequelize.INTEGER,
        references: {
            // This is a reference to another model
            model: Category,  
            // This is the column name of the referenced model
            key: 'id',
            // This declares when to check the foreign key constraint. PostgreSQL only.
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
}, { sequelize, modelName: "product" });

module.exports = Product;
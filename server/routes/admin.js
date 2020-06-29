const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroSequelize = require('admin-bro-sequelizejs')

const Category = require('../models/category');
const Product = require("../models/product");

AdminBro.registerAdapter(AdminBroSequelize)

const adminBro = new AdminBro({
    databases: [],
    rootPath: '/admin',
    resources: [
        Category, Product
    ],
    branding: {
        companyName: 'AllFoodAccess',
    },
    dashboard: {
        handler: async () => {
        },
        component: AdminBro.bundle('../admin-panel/adminPanel')
    },
})
  
const router = AdminBroExpress.buildRouter(adminBro);

module.exports = router;
const Sequelize = require("sequelize");

//Connection to Postgresql Server
const sequelize = new Sequelize("postgres://djflzbep:THwbRMIfdhNhXYErCEfszgTaGpGaFGC8@john.db.elephantsql.com:5432/djflzbep");

sequelize.authenticate()
.then(() => console.log("Connected to SQL"));

sequelize.sync();

module.exports = sequelize;
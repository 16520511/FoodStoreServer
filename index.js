const express = require("express");
const apiRouter = require("./server/routes/api");
const adminRouter = require("./server/routes/admin");
const path = require("path");

const app = express();

//Static files
app.use(express.static(path.join(__dirname, '/public')));

//API Routing
app.use('/api', apiRouter);

//Admin Panel Routing
app.use('/admin', adminRouter)

const port = process.env.PORT || 3000;
app.listen(port);

const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose.connect("mongodb://localhost:27017/BMS");

//middleware
const isBlog = require("./middlewares/isBlog");
app.use(isBlog.isBlog);

//for admin routes
const adminRoute = require("./routes/adminRoute");
app.use('/',adminRoute);

//for user routes
const userRoute = require("./routes/userRoute");
app.use('/',userRoute);

//for blog routes
const blogRoute = require("./routes/blogRoute");
app.use('/',blogRoute);

app.listen(3000, function () {
    console.log("SERVER IS UP")
})
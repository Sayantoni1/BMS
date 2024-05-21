const mongoose = require("mongoose");
const express = require("express");

mongoose.connect("mongodb://localhost:27017/BMS");
const app = express();

app.get('/', function (req, res) {
    res.send("HI")
})

app.listen(3000, function () {
    console.log("SERVER IS UP")
})
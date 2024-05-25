const express = require("express");
const user_route = express();
const bodyParser = require("body-parser");
const userController = require("../controllers/userController");
const session = require("express-session");
const config = require("../config/config");
const adminLoginAuth  = require("../middlewares/adminLoginAuth");

user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

user_route.use(session({secret:config.sessionSecret,
    resave:true,
    saveUninitialized:true
}));

user_route.set('view engine', 'ejs');
user_route.set('views', './views');
user_route.use(express.static('public'));

user_route.get('/login',adminLoginAuth.isLogout,userController.loadLogin);
user_route.post('/login',userController.verifyLogin);

user_route.get('/logout',adminLoginAuth.isLogin,userController.logout);

user_route.get('/profile',userController.profile);

module.exports = user_route;
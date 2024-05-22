const express = require("express");
const admin_route = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const adminController = require("../controllers/adminController");

admin_route.use(bodyParser.json());
admin_route.use(bodyParser.urlencoded({ extended: true }));

admin_route.set('view engine', 'ejs');
admin_route.set('views', './views');
admin_route.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images'));
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
})

const upload = multer({ storage: storage });

admin_route.get('/login', adminController.login);
admin_route.get('/blog-setup', adminController.blogSetup);
admin_route.post('/blog-setup', upload.single('blog_image'), adminController.blogSetupSave);

module.exports = admin_route;
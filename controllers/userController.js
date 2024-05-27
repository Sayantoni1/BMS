const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const randonstring = require('randomstring');
const config = require('../config/config');


const sendResetPasswordMail = async (name, email, token) => {
    try {
        const transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: config.emailUser,
                pass: config.emailPassword
            }
        });

        const mailOptions = {
            from:config.emailUser,
            to:email,
            subject:'Reset Password',
            html:'<p>Hii '+name+', Please click here to <a href="http://127.0.0.1:3000/reset-password?token='+token+'">Reset</a> Your Password.'
        }

        transport.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error);
            } else{
                console.log("Email has been sent",info.response);
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}

const loadLogin = async (req, res) => {
    try {
        res.render('login');

    } catch (error) {
        console.log(error.message);
    }
}

const verifyLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({ email: email });
        if (userData) {
            // const passwordMatch = await bcrypt.compare(password,userData.password);
            const passwordMatch = password === userData.password

            if (passwordMatch) {
                req.session.user_id = userData._id;
                req.session.is_admin = userData.is_admin;
                if (userData.is_admin == 1) {
                    res.redirect('/dashboard');
                }
                else {
                    res.redirect('/profile');
                }
            } else {
                res.render("login", { message: "Email and Password is Incorrect!" });
            }

        } else {
            res.render("login", { message: "Email and Password is Incorrect!" });
        }

    } catch (error) {
        console.log(error.message);
    }
}

const profile = async (req, res) => {
    try {
        res.send('profile');

    } catch (error) {
        console.log(error.message);
    }
}

const logout = async (req, res) => {
    try {
        req.session.destroy();
        res.redirect('/login');
    } catch (error) {
        console.log(error.message);
    }
}

const forgetLoad = async (req, res) => {
    try {
        res.render('forget-password');
    } catch (error) {
        console.log(error.message);
    }
}


const forgetPasswordVerify = async (req, res) => {
    try {
        const email = req.body.email;
        const userData = await User.findOne({ email: email });
        if (userData) {
            const randomString = randonstring.generate();

            await User.updateOne({ email: email }, { $set: { token: randomString } });
            sendResetPasswordMail(userData.name,userData.email,randomString);
            res.render('forget-password',{message:"Please check your mail to reset your password"});
        } else {
            res.render('forget-password', { message: "User email is incorrect" });
        }

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    loadLogin,
    verifyLogin,
    profile,
    logout,
    forgetLoad,
    forgetPasswordVerify
}

/*
express-session - express-session is a middleware module in Express. js that allows us to create sessions
in web application. It stores session data on the server side, and allows us to track user activity.



MVC- MODEL VIEW CONTOLLER
Model: Model represents the structure of data, it is the database part of 
the application. 

View: View is what is presented tothe user,the UI part.

Controller:The user interacts with the View,which in turn generates the appropriate requestnow the 
controller controls the requests of the user and then generates appropriate response which
is fed to the viewer.



ejs - As previously mentioned EJS (Embedded JavaScript) is a template engine that enables developers
to create dynamic HTML pages using JavaScript.



bodyparser -A body-parser is a Node.js library used to extract information from an incoming HTTP request.
and then parses the information into a suitable format which makes processing easy.



bcrpt-Bcrypt is a library in Node.js use to hash and store passwords.



password hashing - Password hashing converts password into a short string of letters and/or numbers
using an encryption algorithm.


nodemailer-Nodemailer is a module for Node.js applications to allow easy as cake email sending



random string- It's a module to generate random string used for functionality like unique identifiers or tokens.
*/
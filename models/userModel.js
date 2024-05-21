const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    is_admin: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    cart: {type: Array, required: false},
    orders: {type: Array, required: false},
    address: {type: String},
    phone: {type: String}
})

const User = mongoose.model("User", userSchema)

module.exports = User;
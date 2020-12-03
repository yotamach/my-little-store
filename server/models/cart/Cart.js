const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Cart = new mongoose.Schema({
    cartItems: {
        type: Array,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    paid: {
        type: Boolean,
        required: true
    }
}, {timestamps: true});
    
module.exports = mongoose.model('Cart', Cart);
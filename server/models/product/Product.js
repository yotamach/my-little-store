const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Product = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {timestamps: true});
    
Product.index({ itemName: 1}, { unique: true });

module.exports = mongoose.model('Product', Product);
const mongoose = require('mongoose')

const productschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required']
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    stock: {
        type: Number,
        default: 0
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model('Product', productschema);

module.exports = Product;
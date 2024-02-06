const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: String,
    name: String,
    category: String,
    price: Number,
    image: String
})

const Product = mongoose.model('Product',productSchema)

module.exports = Product
const mongoose= require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    category: String,
    userId: String,
    country: String
})

module.exports = mongoose.model('products',productSchema);
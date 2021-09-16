const mongoose = require('mongoose')

const productsSchema = mongoose.Schema({
    name: {
        type: String
    },
    img: {
        type: String
    },
    version: {
        type: String,
        default : "1.0.0"
    },
    price: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true

})


const Products = mongoose.model('products', productsSchema)

module.exports = Products
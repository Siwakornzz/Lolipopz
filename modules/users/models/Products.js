const mongoose = require('mongoose')

const productsSchema = mongoose.Schema({
    name:{
        type: String
    },
    img:{
        type: String
    },
    price:{
        type: Number,
        default : 0
    },
},{
    timestamps:true
})

  
  const Products = mongoose.model('products', productsSchema)
  
  module.exports = Products

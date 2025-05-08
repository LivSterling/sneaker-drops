const mongoose = require('mongoose')

const ShoeSchema = new mongoose.Schema({
  name: String,
  date: String,
  price: Number,
  img: String,
  hot: {
    type: Number,
    default: 0,
  },
  not: {
    type: Number,
    default: 0,
  },
})

module.exports = mongoose.model('Shoe', ShoeSchema)
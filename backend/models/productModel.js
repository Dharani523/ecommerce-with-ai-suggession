const mongoose = require('mongoose');

const productschema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: String,
  images: [
    {
      image: String
    }
  ],
  seller: String,
  stock: Number,
  ratings: Number,
  noofreviews: Number,
  createdDate: Date
});

const Productmodel = mongoose.model('Product', productschema);
module.exports = Productmodel;

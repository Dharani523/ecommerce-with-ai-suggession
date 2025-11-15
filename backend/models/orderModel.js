const mongoose = require('mongoose');

const orderschema = new mongoose.Schema({
    cartItems: Array,
    totalAmount: Number,   // ← FIXED
    status: String,
    shippingAddress: {
        name: String,
        phone: String,
        address: String
    },
    createdAt: Date
});

const Ordermodel = mongoose.model('Order', orderschema);
module.exports = Ordermodel;

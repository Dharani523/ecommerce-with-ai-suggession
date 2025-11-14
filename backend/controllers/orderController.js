const Ordermodel = require('../models/orderModel');

exports.createOrder = async (req, res) => {
  try {
    const { cartItems, totalAmount, shippingAddress } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ success: false, error: "Cart is empty" });
    }

    if (!shippingAddress || !shippingAddress.address) {
      return res.status(400).json({ success: false, error: "Shipping address is required" });
    }

    const order = await Ordermodel.create({
      cartItems,
      amount: totalAmount,
      status: "pending",
      shippingAddress,
      createdAt: new Date(),
    });

    res.json({ success: true, order });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

const express = require('express');
const { getproducts, getSingleProducts } = require('../controllers/productController');
const router = express.Router();
const Product = require('../models/productModel');

// ✅ Route to get all unique categories
router.get('/products/categories', async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ Product routes
router.route('/products').get(getproducts);
router.route('/products/:id').get(getSingleProducts);


// ⭐⭐⭐ ADD THIS — AI PRODUCT RECOMMENDER ⭐⭐⭐
router.post("/products/recommend", async (req, res) => {
  try {
    const { categories, cartIds } = req.body;

    if (!categories || categories.length === 0) {
      return res.json({ success: true, recommendations: [] });
    }

    const recommendations = await Product.find({
      category: { $in: categories },
      _id: { $nin: cartIds }  // exclude products already in cart
    })
    .limit(6);

    res.json({ success: true, recommendations });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


module.exports = router;

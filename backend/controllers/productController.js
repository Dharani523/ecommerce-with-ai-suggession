const Productmodel = require('../models/productModel');

// GET /products?search=&category=
exports.getproducts = async (req, res) => {
  try {
    const { search, category } = req.query;

    // Build query object
    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" }; // case-insensitive search by name
    }

    if (category) {
      query.category = category;
    }

    const products = await Productmodel.find(query);

    // Get all categories
    const categories = await Productmodel.distinct("category");

    res.json({
      success: true,
      products,
      categories
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getSingleProducts = async (req, res) => {
  try {
    const product = await Productmodel.findById(req.params.id);
    res.json({ success: true, product });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Product not found' });
  }
};

const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// GET /products - fetch all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// GET /products/:id - fetch product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ msg: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// POST /api/products - Create a new product
router.post('/', async (req, res) => {
  try {
    const { name, price, description, stockQty } = req.body;
    if (!name || !price || !description || stockQty === undefined) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }

    const newProduct = new Product({ name, price, description, stockQty });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
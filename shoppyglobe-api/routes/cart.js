const express = require('express');
const auth = require('../middleware/authMiddleware');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const { getCart } = require('../controllers/cartController');
const router = express.Router();

// GET / - get current user's cart
router.get('/', auth, getCart);

// POST /cart - Add product to cart (auth required)
router.post('/', auth, async (req, res) => {
  try {
    const userId = req.user;
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity < 1)
      return res.status(400).json({ msg: 'Product ID and quantity (>=1) required' });

    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ msg: 'Product not found' });

    if (quantity > product.stockQty)
      return res.status(400).json({ msg: 'Quantity exceeds stock quantity' });

    let cartItem = await CartItem.findOne({ user: userId, product: productId });

    if (cartItem) {
      cartItem.quantity += quantity;
      if (cartItem.quantity > product.stockQty)
        return res.status(400).json({ msg: 'Quantity exceeds stock quantity' });

      await cartItem.save();
    } else {
      cartItem = new CartItem({ user: userId, product: productId, quantity });
      await cartItem.save();
    }

    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// PUT /cart/:id - Update quantity of product in cart (auth required)
router.put('/:id', auth, async (req, res) => {
  try {
    const userId = req.user;
    const cartItemId = req.params.id;
    const { quantity } = req.body;

    if (!quantity || quantity < 1)
      return res.status(400).json({ msg: 'Quantity (>=1) is required' });

    let cartItem = await CartItem.findById(cartItemId).populate('product');
    if (!cartItem) return res.status(404).json({ msg: 'Cart item not found' });

    if (cartItem.user.toString() !== userId)
      return res.status(403).json({ msg: 'Not authorized' });

    if (quantity > cartItem.product.stockQty)
      return res.status(400).json({ msg: 'Quantity exceeds stock quantity' });

    cartItem.quantity = quantity;
    await cartItem.save();

    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// DELETE /cart/:id - Remove product from cart (auth required)
router.delete('/:id', auth, async (req, res) => {
  try {
    const userId = req.user;
    const cartItemId = req.params.id;

    const cartItem = await CartItem.findById(cartItemId);
    if (!cartItem) return res.status(404).json({ msg: 'Cart item not found' });

    if (cartItem.user.toString() !== userId)
      return res.status(403).json({ msg: 'Not authorized' });

    await cartItem.deleteOne();
    res.json({ msg: 'Cart item removed' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
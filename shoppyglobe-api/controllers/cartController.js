const Cart = require('../models/CartItem');
const Product = require('../models/Product');

// Get current user's cart
const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user }).populate('product');
    if (!cart) {
      cart = await Cart.create({ user: req.user, items: [] });
    }
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCart,
};

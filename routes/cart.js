const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Hiển thị giỏ hàng
router.get('/', (req, res) => {
  const cart = req.session.cart || [];
  res.render('cart', { cart });
});

// Thêm sản phẩm vào giỏ hàng
router.post('/add/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      if (!req.session.cart) {
        req.session.cart = [];
      }
      req.session.cart.push(product);
      res.redirect('/products');
    } else {
      res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Xóa sản phẩm khỏi giỏ hàng
router.post('/remove/:id', (req, res) => {
  if (req.session.cart) {
    req.session.cart = req.session.cart.filter(item => item._id != req.params.id);
  }
  res.redirect('/cart');
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Lấy danh sách sản phẩm
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('products', { products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy thông tin chi tiết sản phẩm
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.render('product-detail', { product });
    } else {
      res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Tạo sản phẩm mới
router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cập nhật sản phẩm
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.price = req.body.price || product.price;
      product.imageUrl = req.body.imageUrl || product.imageUrl;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Xóa sản phẩm
router.delete('/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        await Product.deleteOne({ _id: req.params.id });
        res.json({ message: 'Đã xóa sản phẩm' });
      } else {
        res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
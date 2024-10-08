const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');

const app = express();

// Kết nối MongoDB
mongoose.connect('mongodb+srv://hoangxuannguyeniop:Hoang0903905091@cluster.2morw.mongodb.net/shop', { useNewUrlParser: true, useUnifiedTopology: true });

// Cấu hình middleware
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Cấu hình routes
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
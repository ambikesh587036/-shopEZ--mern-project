// 2. backend/server.js  (yeh main file hai)
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',                    // production mein specific domain daal dena
  credentials: true
}));
app.use(express.json());

// Static files serve karne ke liye (frontend ko same server pe chalayenge)
app.use(express.static(path.join(__dirname, 'public')));

// ==================== SAMPLE PRODUCTS (seed) ====================
const products = [
  {
    id: "1",
    name: "Premium Sneakers",
    price: 199,
    image: "https://picsum.photos/id/20/300/300",
    rating: 4.8,
    description: "Ultra comfortable premium sneakers with leather finish."
  },
  {
    id: "2",
    name: "Wireless Headphones",
    price: 299,
    image: "https://picsum.photos/id/29/300/300",
    rating: 4.5,
    description: "Noise-cancelling wireless headphones with 30hr battery."
  },
  {
    id: "3",
    name: "Smart Watch",
    price: 249,
    image: "https://picsum.photos/id/201/300/300",
    rating: 4.7,
    description: "Fitness tracking + heart rate + GPS smartwatch."
  }
];

// ==================== API ROUTES ====================

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get single product (quick view ke liye)
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (product) return res.json(product);
  res.status(404).json({ message: 'Product not found' });
});

// Login (demo - real mein JWT + MongoDB add kar sakte ho)
app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;
  res.json({
    success: true,
    token: "demo_jwt_token_" + Date.now(),
    user: { name: "Ambikesh", email }
  });
});

// Signup
app.post('/api/auth/signup', (req, res) => {
  res.json({ success: true, message: "Account created successfully!" });
});

// Cart routes (server-side, in-memory - demo ke liye perfect)
let cart = [];

app.get('/api/cart', (req, res) => {
  res.json(cart);
});

app.post('/api/cart/add', (req, res) => {
  const { productId } = req.body;
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    return res.json({ success: true, cart, message: `${product.name} added to cart!` });
  }
  res.status(404).json({ message: 'Product not found' });
});

app.delete('/api/cart/remove/:id', (req, res) => {
  cart = cart.filter(item => item.id !== req.params.id);
  res.json({ success: true, cart });
});

app.post('/api/cart/clear', (req, res) => {
  cart = [];
  res.json({ success: true });
});

// Frontend ke saare HTML files ko serve karo
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 eshopEZ Backend running on http://localhost:${PORT}`);
  console.log(`📁 Put your HTML/CSS/JS files inside 'public' folder`);
});

require('dotenv').config();  // Load environment variables

const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
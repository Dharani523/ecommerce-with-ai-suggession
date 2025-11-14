// app.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/connectdb'); // ✅ fixed typo (was connnectdb)
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');

// dotenv.config({ path: './config/config.env' });
dotenv.config();


const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use('/api/v1', productRoutes);
app.use('/api/v1', orderRoutes);

// ✅ Default route (optional)
app.get('/', (req, res) => {
  res.send('API is running successfully 🚀');
});

// ✅ Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

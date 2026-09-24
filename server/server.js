const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Base API route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'CampusFind AI Backend API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Future API routes placeholder
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/items', require('./routes/itemRoutes'));
// app.use('/api/matches', require('./routes/matchRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`CampusFind AI Server running on port ${PORT}`);
});

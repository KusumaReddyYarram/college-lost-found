const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

dotenv.config();

// Attempt MongoDB Connection
if (process.env.MONGO_URI) {
  connectDB();
} else {
  console.log('Notice: MONGO_URI not set. Running in demo database mode.');
}

const app = express();

// Core Middleware
app.use(express.json());
app.use(cors({
  origin: '*',
  credentials: true
}));

// API Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'CampusFind AI Express REST API is active',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    services: {
      auth: 'active',
      items: 'active',
      smartMatching: 'active',
      claims: 'active',
      stats: 'active'
    }
  });
});

// API Routes Mounting
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/matches', require('./routes/matchRoutes'));
app.use('/api/claims', require('./routes/claimRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));

// Error Handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 CampusFind AI Express Server running on port ${PORT}`);
});

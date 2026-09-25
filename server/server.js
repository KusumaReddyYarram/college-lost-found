const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

dotenv.config();

// Attempt MongoDB Connection
const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
if (mongoUri) {
  connectDB();
} else {
  console.log('Notice: MONGO_URI / MONGODB_URI not set in environment.');
}

const app = express();

// Core Middleware
app.use(express.json());

const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://127.0.0.1:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
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
      notifications: 'active',
      admin: 'active',
      stats: 'active'
    }
  });
});

// API Routes Mounting
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/matches', require('./routes/matchRoutes'));
app.use('/api/claims', require('./routes/claimRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Error Handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 CampusFind AI Express Server running on port ${PORT}`);
});

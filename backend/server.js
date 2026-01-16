// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // Recommended for security
const authRoutes = require('./src/routes/authRoutes');
const prisma = require('./src/utils/prisma'); // <--- Import the shared DB connection

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// ----------------------------------------------------
// Health Check (Verifies DB Connection) [cite: 295-308]
// ----------------------------------------------------
app.get('/api/health', async (req, res) => {
  try {
    // Actually ping the database to ensure connection works
    await prisma.$queryRaw`SELECT 1`;
    
    res.status(200).json({ 
      status: 'success', 
      message: 'Server is running and Database is connected!' 
    });
  } catch (error) {
    console.error('Database Check Failed:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Database connection failed', 
      error: error.message 
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
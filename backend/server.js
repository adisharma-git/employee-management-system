// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./src/routes/authRoutes');
const employeeRoutes = require('./src/routes/employeeRoutes');
const attendanceRoutes = require('./src/routes/attendanceRoutes'); 
const prisma = require('./src/utils/prisma'); 
const logRoutes = require('./src/routes/logRoutes');

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); 
app.use(cors());
app.use(helmet());
app.use('/api/employee', employeeRoutes);
app.use('/api/logs', logRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);

app.get('/api/health', async (req, res) => {
  try {
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
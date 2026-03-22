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
const adminRoutes = require('./src/routes/adminRoutes');
const leaveRoutes = require('./src/routes/leaveRoutes');
const annoutncementRoutes = require('./src/routes/announcementRoutes');
const leaveTypeRoutes = require('./src/routes/leaveTypeRoutes');
const meetingRoutes = require('./src/routes/meetingRoutes');
const holidayRoutes = require('./src/routes/holidayRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');
const payrollRoutes = require('./src/routes/payrollRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration - UPDATE THIS
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:5000',
    'https://employee-management-system-xi-nine.vercel.app',
    'https://www.workalignr.in',  
    'https://workalignr.in',
    'https://employee-management-system-9qg1.onrender.com', 
    process.env.FRONTEND_URL // We'll add this env variable
  ].filter(Boolean), // Remove undefined values
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json()); 

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/admin', adminRoutes); 
app.use('/api/leaves', leaveRoutes);
app.use('/api/announcements', annoutncementRoutes);
app.use('/api/leave-types', leaveTypeRoutes);
app.use('/api/meetings', meetingRoutes);
app.use('/api/holidays', holidayRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/payroll', payrollRoutes);

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
  console.log(`Server running on port ${PORT}`);
});
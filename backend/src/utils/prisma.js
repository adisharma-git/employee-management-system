// backend/src/utils/prisma.js
const { PrismaClient } = require('@prisma/client');

// ✅ Works perfectly with Prisma 5
const prisma = new PrismaClient();

module.exports = prisma;
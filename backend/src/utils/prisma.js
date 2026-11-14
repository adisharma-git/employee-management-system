// backend/src/utils/prisma.js
const { PrismaClient } = require('@prisma/client');
const { getDemoClient, isDemoDatabaseActive } = require('./demoDatabase');

const mainClient = new PrismaClient();

// The client every module imports. It uses the main database, except while
// handling a demo visitor's request, when it uses the demo schema instead
// (see demoDatabase.js).
const prisma = new Proxy(mainClient, {
  get(target, property) {
    const client = isDemoDatabaseActive() ? getDemoClient() : target;
    const value = Reflect.get(client, property);
    return typeof value === 'function' ? value.bind(client) : value;
  }
});

module.exports = prisma;

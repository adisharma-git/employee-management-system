// backend/prisma.config.ts
import 'dotenv/config';  // <--- ADD THIS LINE AT THE VERY TOP
import { defineConfig } from '@prisma/config';

export default defineConfig({
  datasource: {
    // The transaction pool URL (Port 6543)
    url: process.env.DATABASE_URL,
    // The direct connection URL (Port 5432) - Required for migrations
    directUrl: process.env.DIRECT_URL,
  },
});
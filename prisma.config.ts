import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  datasource: {
    // Di sini satu-satunya tempat naruh URL di Prisma 7
    url: process.env.DATABASE_URL,
  },
});
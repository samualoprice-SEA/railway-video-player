import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  reporter: [['html', { open: 'never' }]],   // <-- ensures playwright-report/ is created
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:5173',
    headless: true,
    trace: 'retain-on-failure',              // nice for debugging failures
    video: 'retain-on-failure',              // video on failure, uploaded in the report
  },
});

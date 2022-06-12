import { devices, PlaywrightTestConfig } from '@playwright/test';
import path from 'path';

export default {
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3004',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  testDir: path.join(__dirname, 'e2e'),
  outputDir: path.join(__dirname, 'e2e/results'),
} as PlaywrightTestConfig;

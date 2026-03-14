import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  globalSetup: './src/test-data/global-setup.ts',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  retries: 0,
  workers: undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL,
    httpCredentials: {
      username: process.env.HTTP_USERNAME ?? '[NOT SET]',
      password: process.env.HTTP_PASSWORD ?? '[NOT SET]',
    },
    actionTimeout: 0,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

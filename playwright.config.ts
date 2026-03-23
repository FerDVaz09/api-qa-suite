import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: true,
  reporter: [
    ['html', { outputFolder: 'reports/playwright-report', open: 'never' }],
    ['list']
  ],
  use: {
    baseURL: 'https://fakestoreapi.com',
    extraHTTPHeaders: {
      'Accept': 'application/json',
    },
  },
  projects: [
    {
      name: 'API Tests',
      testMatch: '**/api/*.spec.ts',
    },
    {
      name: 'E2E Tests',
      testMatch: '**/e2e/*.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

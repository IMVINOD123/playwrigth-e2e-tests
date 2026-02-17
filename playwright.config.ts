import { defineConfig, devices } from '@playwright/test';

// The below 3 Line read the Environment file
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  //forbidOnly: !!process.env.CI,
  forbidOnly: false,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  globalTimeout: 3 * 60 * 60 * 1000,
  globalSetup: require.resolve('./tests/helpers/global-setup.ts'),
  globalTeardown: require.resolve('./tests/helpers/global.teardown.ts'),
  reporter: [
    ['html', { open: 'never' }],
    ['allure-playwright', {
      detail: true,
      suiteTitle: true,
      environmentInfo: {
        name: 'TEST',
        appName: 'DEMOPLAYWRIGHT',
        Release: 'Release 1.1',
        Browser: 'Chrome',
        OS: process.platform,
        Executor: process.env.USER || 'Local',
        ExecutorType: 'Playwright Test',
      },
      categories: [
        { "name": "UI Failures", "matchedStatuses": ["failed"], "messageRegex": ".*Element.*" },
        { "name": "Assertion Failures", "matchedStatuses": ["failed"], "traceRegex": ".*AssertionError.*" },
        { "name": "Timeout Issues", "matchedStatuses": ["broken"], "messageRegex": ".*Timeout.*" },
        { "name": "Passed Tests", "matchedStatuses": ["passed"] }
      ],
      history: true,
      outputFolder: 'allure-results'
    }]
  ],
  use: {
    trace: 'on-first-retry',
    ignoreHTTPSErrors: true,
    navigationTimeout: 30_000,
    headless: true,
    screenshot: 'only-on-failure'
  },
   projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 13'],
    //   },
    // },
    // {
    //   name: 'Galaxy A55',
    //   use: {
    //     ...devices['Galaxy A55'],
    //   },
    // },
  ],
});
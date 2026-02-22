name: Playwright Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main, master ]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    env:
      RUNNER: ${{ secrets.RUNNER }}
      TEST_USER_NAME: ${{ secrets.TEST_USER_NAME }}
      TEST_PASSWORD: ${{ secrets.TEST_PASSWORD }}
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v5
        with:
          node-version: lts/*
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: |
          npx playwright test --reporter=line,allure-playwright
        env:
          ALLURE_RESULTS_DIR: ./allure-results
      - name: Generate Allure Report
        uses: simple-elf/allure-report@v1
        with:
          allure_results: ./allure-results
          allure_history: ./allure-history
          allure_report_path: ./allure-report
      - uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: allure-report
          path: ./allure-report/
          retention-days: 30
      - uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30

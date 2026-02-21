import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://admin-demo.nopcommerce.com/login?returnUrl=%2Fadmin%2F');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Customers' }).click();
  await page.getByRole('link', { name: 'Customers' }).nth(1).click();
});
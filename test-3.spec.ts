import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://admin-demo.nopcommerce.com/login?returnUrl=%2Fadmin%2F');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Customers' }).click();
 
  await page.getByRole('link', { name: 'Customers' }).nth(1).click();
  await page.getByRole('textbox', { name: 'First name' }).fill('vinod');
  await page.getByRole('textbox', { name: 'Last name' }).fill('biradar');
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByRole('button', { name: 'Search' }).press('ArrowDown');

  await page.getByRole('cell', { name: 'No data available in table' });
});

//https://admin-demo.nopcommerce.com/Admin/Customer/List
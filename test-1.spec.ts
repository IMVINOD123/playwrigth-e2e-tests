import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://admin-demo.nopcommerce.com/');
  await page.getByRole('textbox', { name: 'Email:' }).fill('admin@yourstore.com');
   await page.getByRole('textbox', { name: 'Password:' }).fill('admin');
  await page.getByRole('button', { name: 'Log in' }).click();

  await expect(page).toHaveURL("https://admin-demo.nopcommerce.com/admin/")
});
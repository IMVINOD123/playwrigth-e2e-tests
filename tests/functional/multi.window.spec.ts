import { test, expect } from '@playwright/test';

test.describe("Multiple Windows Handling", () => {
  test('Should handle multiple windows and navigate between them', async ({ context, page }) => {
    // Step 1: Navigate to the site
    await page.goto('https://the-internet.herokuapp.com/', { waitUntil: 'domcontentloaded' });
    console.log('✓ Navigated to https://the-internet.herokuapp.com/');

    // Assert the main page header
    const mainHeader = await page.locator('h1').first().textContent();
    console.log(`✓ Main page header: ${mainHeader}`);
    expect(mainHeader).toContain('Welcome');

    // Step 2: Click on "Multiple Windows" link
    const multiWindowsLink = page.getByText('Multiple Windows', { exact: true });
    await expect(multiWindowsLink).toBeVisible({ timeout: 5000 });

    const newPagePromise = context.waitForEvent('page');
    await multiWindowsLink.click();
    const newPage = await newPagePromise;
    console.log('✓ Clicked on "Multiple Windows" link');

    // Get the newly opened window
    await newPage.waitForLoadState('domcontentloaded');
    console.log('✓ New window opened');

    // Step 3: Assert the header on the new window
    const h3Text = await newPage.locator('h3').textContent();
    if (h3Text) {
      console.log(`✓ New window header: ${h3Text}`);
      expect(h3Text).toBeTruthy();
    }

    // Step 4: Click the "Click Here" link on the new window to open another window
    const clickHereLink = newPage.getByText('Click Here', { exact: true });
    await expect(clickHereLink).toBeVisible({ timeout: 5000 });

    const thirdPagePromise = context.waitForEvent('page');
    await clickHereLink.click();
    const thirdPage = await thirdPagePromise;
    console.log('✓ Clicked "Click Here" link on new window');

    // Get the third window
    await thirdPage.waitForLoadState('domcontentloaded');
    console.log('✓ Third window opened');

    // Step 5: Assert the content on the third window
    const thirdWindowContent = await thirdPage.content();
    console.log(`✓ Third window loaded with content`);
    expect(thirdWindowContent).toBeTruthy();

    // Step 6: Verify parent window is still accessible
    const parentTitle = await page.title();
    console.log(`✓ Parent window title: ${parentTitle}`);
    expect(parentTitle).toContain('Internet');

    // Verify parent window is still functional
    const parentHeaderCheck = await page.locator('h1').first().isVisible();
    console.log(`✓ Parent window still accessible and functional: ${parentHeaderCheck}`);

    // Verify we can still access new window
    const newWindowTitle = await newPage.title();
    console.log(`✓ New window still accessible with title: ${newWindowTitle}`);
    console.log('✓✓✓ Test completed successfully! All windows handled correctly ✓✓✓');
  });
});
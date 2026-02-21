import { test, Page, Locator } from "@playwright/test";

/**
 * Takes a screenshot of the full page and attaches it to the test report.
 * @param page The page object.
 * @param screenshotName The name of the screenshot.
 */
async function takeFullPageScreenshot(page: Page, screenshotName: string) {
  const screenshot = await page.screenshot({ fullPage: true });
  await test.info().attachments.push({
    name: screenshotName,
    contentType: 'image/png',
    body: screenshot
  });
}

/**
 * Takes a screenshot of a specific element and attaches it to the test report.
 * @param element The element locator.
 * @param screenshotName The name of the screenshot.
 */
async function takeElementScreenshot(element: Locator, screenshotName: string) {
  const screenshot = await element.screenshot();
  await test.info().attachments.push({
    name: screenshotName,
    contentType: 'image/png',
    body: screenshot
  });
}

export default { takeElementScreenshot, takeFullPageScreenshot };
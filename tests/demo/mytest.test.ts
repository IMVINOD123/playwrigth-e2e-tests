import { test, expect } from "@playwright/test"

test("should validated title of web page", async ({ page }) => {

    //Go to URL of Web page
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    //validate the title of the page
    await expect(page).toHaveTitle("CURA Healthcare Service");

    //validate the string of the title of the page
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
});


import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
test.beforeAll("Before all hooks", () => {
    console.log(">>Runs before all hook run at file level")
})
test.describe("Make Appointment login setup", () => {
    test.beforeAll("Before all hooks in Decribe", () => {
        console.log(">>Runs before all hook run at decribe level")
    })
    test.beforeEach("User login with proper creds", async ({ page }, testinfo) => {

        await page.goto("https://katalon-demo-cura.herokuapp.com/");

        await expect(page).toHaveTitle("CURA Healthcare Service");

        await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

        await page.getByRole("link", { name: "Make Appointment" }).click();
        await expect(page.getByText("Please login to make")).toBeVisible();

        await page.getByLabel("Username").fill("John Doe");
        await page.getByLabel("Password").fill("ThisIsNotAPassword");
        await page.getByRole("button", { name: "Login" }).click();

        // let fullpagescreenshot = await page.screenshot({ fullPage: true })
        // let allfullpagescreenshot = await page.screenshot({ path: "screen1.png" })
        // await testinfo.attach("attached screenshot",
        //     {
        //         body: fullpagescreenshot,
        //         contentType: "image/png",

        //     });


        await expect(page.getByText('Make Appointment').nth(1)).toBeVisible();

    })
    test.afterEach("After all hooks", () => {
        console.log(">>Runs After all hook run at Decribe level")
    })

    test('Test should make appointments with no default value', async ({ page }) => {

        //dropdown
        await page.getByRole('heading', { name: 'Make Appointment' }).click();
        //check box
        await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).check();
        //radio
        await page.getByRole('radio', { name: 'Medicaid' }).check();
        //Date fields
        await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
        await page.getByRole('textbox', { name: 'Visit Date (Required)' }).fill('05/10/2026');
        await page.getByRole('textbox', { name: 'Visit Date (Required)' }).press('Enter');
        await page.getByRole('textbox', { name: 'Comment' }).click();
        await page.getByRole('textbox', { name: 'Comment' }).fill('this is multiline comments');
        //button Appointment
        await page.getByRole('button', { name: 'Book Appointment' }).click();
        await expect(page.getByRole('heading', { name: 'Appointment Confirmation' })).toBeVisible();
        await page.getByText('Please be informed that your').click();
        await page.getByRole('link', { name: 'Go to Homepage' }).click();
        await expect(page.getByRole('link', { name: 'Make Appoint' })).toBeVisible();
    });

})
test.afterAll("After all hooks", () => {
    console.log(">>Runs After all hook run at file level")
})



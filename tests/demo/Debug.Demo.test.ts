

import { test, expect } from '@playwright/test';

/*
    List of Debug options:
    1 Running in Debug mode keeping break point
    2 "Debuge-appoint:ui": "playwright test tests/demo/Debug.Demo.test.ts --project=chromium --ui --headed",
    3 "Debuge-appoint:trace": "playwright test tests/demo/Debug.Demo.test.ts --project=chromium --trace on",
    4 "Debuge-appoint:cli": "PWDEBUG=1 npx playwright test tests/demo/Debug.Demo.test.ts --project=chromium",

*/

test.describe("Make Appointment login setup", () => {

    test.beforeEach("User login with proper creds", async ({ page }) => {

        await page.goto("https://katalon-demo-cura.herokuapp.com/");

        await expect(page).toHaveTitle("CURA Healthcare Service");

        await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
        
   
        
        await page.getByRole("link", { name: "Make Appointment" }).click();
   
        await expect(page.getByText("Please login to make")).toBeVisible();

       
        await page.getByLabel("Username").fill("John Doe");
        await page.getByLabel("Password").fill("ThisIsNotAPassword");
        await page.getByRole("button", { name: "Login" }).click();

        await expect(page.getByText('Make Appointment').nth(1)).toBeVisible();

    })

    test('Test should make appointments with no default value', async ({ page }) => {

        
      
        await page.getByLabel("Facility").selectOption({ index: 2 })

        /* Get all Drop Down values*/
        let mydropdownElements = page.getByLabel("Facility").locator("option")
        await expect(mydropdownElements).toHaveCount(3);
        /* Print drop down value*/
        let mydropdownValue = await page.getByLabel("Facility").all()
        let listofOptions = []
        for (let value of mydropdownValue) {
            let elementText = await value.textContent()
            if (elementText) {
                listofOptions.push(elementText)
            }
        }
        console.log(`>>> The list of Options Text Elements ${listofOptions}`);
       
        //check box
        await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).check();
        //radio
        await expect(page.getByText(" Medicare")).toBeChecked();
        await page.pause()
        await page.getByRole('radio', { name: 'Medicaid' }).check();
        /** Negative secnario elements not to be selected after selection on above radio button */
        await expect(page.getByText("Medicare")).not.toBeChecked();
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
        await expect(page.getByRole('link', { name: 'Make Appointment' })).toBeVisible();
    });
})



import { test, expect } from '@playwright/test';
import filehelper from '../helpers/csv.data.helper';
import path from 'path';
const Logger = require('../helpers/logger.js');

const logger = new Logger();

const csvFilePath=path.resolve(`${process.cwd()}/data/Functional/make-aptment-test-data.csv`)
const appData=filehelper.readCSV(csvFilePath)

for(const csvValue of appData)
{
test.describe("Make Appointment login setup", () => {
  test.beforeEach("User login with proper creds", async ({ page }, testInfo) => {
    const envConfig = testInfo.project.use as any;
      await logger.info('URL start Launching ');
    
    await page.goto(envConfig.appURL);
    
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page.getByText("Please login to make")).toBeVisible();
   await page.getByLabel("Username").fill(process.env.TEST_USER_NAME!);
        await page.getByLabel("Password").fill(process.env.TEST_PASSWORD!);
    await page.getByRole("button", { name: "Login" }).click();

       await expect(page.getByText('Make Appointment').nth(1)).toBeVisible();
    
     logger.error(">>>>Failed to login by user")
  });
  test(`${csvValue.testid}Test should make appointments with no default value`, async ({ page }) => {

    
        //dropdown
        await page.getByLabel("Facility").selectOption(csvValue.facility);
        
        await page.getByRole('heading', { name: 'Make Appointment' }).click();
        //check box
        await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).check();
        //radio
        await page.getByRole('radio', { name: csvValue.hcp }).check();
        //Date fields
        await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
        await page.getByRole('textbox', { name: 'Visit Date (Required)' }).fill(csvValue.visiteDate);
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
   
  
});
}

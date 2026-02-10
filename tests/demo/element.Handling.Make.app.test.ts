

import { test, expect } from '@playwright/test';

test.describe("Make Appointment login setup", () => {

    test.beforeEach("User login with proper creds", async ({ page }) => {

        await page.goto("https://katalon-demo-cura.herokuapp.com/");

        await expect(page).toHaveTitle("CURA Healthcare Service");

        await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
        /*
           Elements Handling below
           1 click()
           2 press
           3 doubleclick
           4 right click
           5 mouse hover
           6 [Option] time out if slow
   
           // await page.getByRole("link", { name: "Make Appointment" }).click();
          // await page.getByRole("link", { name: "Make Appointment" }).press("Enter");
          // await page.getByRole("link", { name: "Make Appointment" }).dblclick();
          // await page.getByRole("link", { name: "Make Appointment" }).click({button:'right'});
          // await page.getByRole("link", { name: "Make Appointment" }).hover();   
   
        */
        await page.getByRole("link", { name: "Make Appointment" }).click();
        // await page.getByRole("link", { name: "Make Appointment" }).press("Enter");
        // await page.getByRole("link", { name: "Make Appointment" }).dblclick();
        // await page.getByRole("link", { name: "Make Appointment" }).click({button:'right'});
        // await page.getByRole("link", { name: "Make Appointment" }).hover();
        await expect(page.getByText("Please login to make")).toBeVisible();

        /** Text Boxes 
         1 clear and click before filling
         2 fill
         3 pressSquencetially [Slow Typing]
        */

        /*Clear
           await page.getByLabel("Username").clear(); 
           
       */
        /*pressSequentially
        await page.getByLabel("Username").pressSequentially("John Doe" ,{delay:400});
                */
        await page.getByLabel("Username").fill("John Doe");
        await page.getByLabel("Password").fill("ThisIsNotAPassword");
        await page.getByRole("button", { name: "Login" }).click();

        await expect(page.getByText('Make Appointment').nth(1)).toBeVisible();

    })

    test('Test should make appointments with no default value', async ({ page }) => {

        /*dropdown
        
        1. Assest Default value
        2. Select by : lable,index
        3. Assert the count
        4. Get all dropdown        
        */
        // Assert the default options
        // await expect(page.getByLabel("Facility")).toHaveValue("Tokyo CURA Healthcare Center")

        // select based on 
        /*lable*/
        //await page.getByLabel("Facility").selectOption("Hongkong CURA Healthcare Center")
        //await page.getByLabel("Facility").selectOption({label:"Seoul CURA Healthcare Center"})

        /* Index*/
        await page.getByLabel("Facility").selectOption({ index: 2 })

        /* Get all Drop Down values*/
        let mydropdownElements= page.getByLabel("Facility").locator("option")
        await expect(mydropdownElements).toHaveCount(3);
        /* Print drop down value*/
        let mydropdownValue= await page.getByLabel("Facility").all()
        let listofOptions=[]
        for(let value of mydropdownValue)
        {
            let elementText=await value.textContent()
            if(elementText)
            {
            listofOptions.push(elementText)
            }
        }
        console.log(`>>> The list of Options Text Elements ${listofOptions}`);

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
        await expect(page.getByRole('link', { name: 'Make Appointment' })).toBeVisible();
    });
})



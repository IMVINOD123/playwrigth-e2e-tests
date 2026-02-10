import { test,expect } from "@playwright/test";

test("test",async({page})=>{
     //step 1 : Go to URL of Web page
      await page.goto("https://katalon-demo-cura.herokuapp.com/");
    //step 2 : Click on the Make Appointment
    await page.getByRole("link",{name:"Make Appointment"}).click();

    //await page.waitForSelector('#welcomeText', { state: 'visible' });
   // await expect(page.getByText("Make Appointment")).toBeVisible();
    //step 3 login
    await page.getByLabel("Username").fill("Jone Doe");
    await page.getByLabel("Password").fill("Thisisnotpassdord");
    await page.getByRole("button",{name:"Login"}).click();

    //step 4 Assert the text
    await expect(page.locator("h2")).toContainText("Make Appointment");
})


import { test, expect } from "@playwright/test"
import { json } from "stream/consumers";

test("should validated title of web page", async ({ page }) => {

    //Go to URL of Web page
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    //validate the title of the page
    await expect(page).toHaveTitle("CURA Healthcare Service");

    //validate the string of the title of the page
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
});

test.only("Test cases used for location  concept", async ({ page },testinfo) => {

    console.log(`>>>>I am from mytest${JSON.stringify(testinfo.config)}`);
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    let _MakeAppointment=page.getByRole("link", { name: "Make Appointment" });
    console.log(`The Type of _MakeAppointment is :${typeof(_MakeAppointment)} and Value of it:\n
    ${JSON.stringify(_MakeAppointment)}`)
    await _MakeAppointment.click();
    //await expect(page.getByText("Make Appointment")).toBeVisible();
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
})
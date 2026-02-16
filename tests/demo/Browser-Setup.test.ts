import { expect, test } from "@playwright/test";

test.describe("Loging Functionality", { annotation: { type: "Stroy", description: "JIRA-1231" }, tag: "@Regression" }, () => {

  test.beforeEach("Go to login page", async ({ page }) => {

    await page.goto("https://katalon-demo-cura.herokuapp.com/");

    await expect(page).toHaveTitle("CURA Healthcare Service");

    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page.getByText("Please login to make")).toBeVisible();

  })
  test.only("sunccessful login", { tag: "@smoke" }, async ({ page }) => {


    /**
     * 1 Just locater Elment Lazy
     * 2 invalid locator on action method
     * 3 valid locator but invalid action
     * 4 invalid locator  on expect method
     * 
     */

    // auto waiting

    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click({ timeout: 10_000 });

    await expect(page.locator("h2")).toContainText("Make Appointment", { timeout: 10_000 });
  });


  test("UnSuccessfull login", { tag: "@smoke" }, async ({ page }) => {

    await page.getByLabel("Username").fill("John ");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();


    await expect(page.locator("h2")).toContainText("Login");
    await page.waitForTimeout(2000);
    await expect(page.locator('#login')).toContainText("Login failed! Please ensure the username and password are valid.");
  });

})



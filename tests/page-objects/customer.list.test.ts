import BasePage from "./base.page.js";
import { expect, type Page } from "@playwright/test";
import takescreenshot from "../helpers/screenshot.helper.test.js"
const Logger = require('../helpers/logger.js');
const log = new Logger();


class CustList extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    get firstNameInputBox() {
        return this.page.getByRole("textbox", { name: "First name" });
    }
    get lastNameInputBox() {
        return this.page.getByRole("textbox", { name: "Last name" });
    }
    get searchBtn() {
        return this.page.locator('xpath=//*[@id="search-customers"]')
    }
    get noResultsMesage() {
        return this.page.getByRole("cell", { name: "No data available in table" });
    }
    get cusrtomerLabel() {
        return this.page.getByRole('link', { name: 'Customers' })
    }
    get customerListPage() {
        return this.page.getByRole('link', { name: 'Customers' }).nth(1);
    }
    get pressDwonKeyFromKeyBorad() {
        return this.page.getByRole('button', { name: 'Search' }).press('ArrowDown')
    }
    async gotoCustomerList(customerList: string) {
        this.navigateTo(customerList)
    }
    async gotoCustomerLabel()
    {
            await this.cusrtomerLabel.click()
            await this.page.waitForTimeout(1_0000)

            await this.customerListPage.click()
    }
    /* Page Actions */
    async searchNameAndConfirm(firstname: string, lastname: string): Promise<boolean> {
        await log.info(`Searching user: ${firstname} ${lastname}...`);
        let nameNotExist = false;
        try {

           
            // await this.page.getByRole('link', { name: 'Customers' }).nth(1).click();
            await this.page.waitForTimeout(1_000)
            await this.typeInto(this.firstNameInputBox, firstname);
            await this.typeInto(this.lastNameInputBox, lastname);

            await this.click(this.searchBtn);

            await this.pressDwonKeyFromKeyBorad
            await this.pressDwonKeyFromKeyBorad
            await this.pressDwonKeyFromKeyBorad
            await this.pressDwonKeyFromKeyBorad
            

            let isNotDisplayed = await this.noResultsMesage.isVisible();
            if (isNotDisplayed) { nameNotExist = true; }
            else { await takescreenshot.takeFullPageScreenshot(this.page, "CustomerList") }



            await log.info(`User: ${firstname} ${lastname} does not exist in the customer list, writing to error file...`);
        } catch (err) {
            (err as Error).message = `Failed searching given firstname: ${firstname} and lastname: ${lastname} on customers page, ${(err as Error).message
                }`;
            throw err;
        }
        return nameNotExist;
    }
}

export default CustList;
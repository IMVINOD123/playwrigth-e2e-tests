import BasePage from "./base.page.js";
import constants from '../../data/constant.json';
import { expect, type Page } from "@playwright/test";

const Logger = require('../helpers/logger.js');

const log = new Logger();

class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    /* Elements */
    get usernameInputBox() {
        return this.page.getByRole("textbox", { name: "Email:" });
    }
    get usernameInputBoxFirstName() {
        return this.page.getByRole('textbox', { name: 'First name' });
    }
    get usernameInputBoxLastName() {
        return this.page.getByRole('textbox', { name: 'Last name' });
    }
    get passwordInputBox() {
        return this.page.getByRole("textbox", { name: "Password:" });
    }
    get loginBtn() {
        return this.page.getByRole("button", { name: "Log in" });
    }
    get searchBtnBy() {
        return this.page.getByRole('button', { name: 'Search' });
    }

    pressArrowDownBtn() {
        this.page.getByRole('button', { name: 'Search' }).press('ArrowDown');
    }

    /* Page Actions */
    async loginTonopCommerceWeb(url: string, username: string, password: string) {
        try {
            await log.info(`Login to :${url} with ${username}`);
            await this.navigateTo(url);
            await this.typeInto(this.usernameInputBox, username);
            await this.typeInto(this.passwordInputBox, password);
            await this.click(this.loginBtn);
            await expect(this.page).toHaveTitle("Dashboard / nopCommerce administration");
            await log.info("Home page is launched successfully...");
        } catch (err) {
            (err as Error).message = `Failed login to nopcommerce web: ${url}, with username: ${username}`;
            throw err;
        }
    }

}

export default HomePage;

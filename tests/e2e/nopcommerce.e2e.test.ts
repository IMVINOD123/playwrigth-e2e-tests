import { test, expect } from "@playwright/test";
import { log } from "../helpers/logger.js";
import HomePage from "../page-objects/nopcommerce.home.page.js";

test("NopCommerce Home Page Login", async ({ page }, testInfo) => {

    //calling the Env Config
    const ennConfig = testInfo.project.use as any
    //creating object of Homepage
    const homePaga = new HomePage(page)

    await homePaga.loginTonopCommerceWeb(ennConfig.nopCommerceURL, process.env.NOPCOMM_TEST_USER_NAME,
        process.env.NOCOMM_TEST_PASSWORD)
});
import { test, expect } from "@playwright/test";
import constants from "../../data/constant.json";
import HomePage from "../page-objects/nopcommerce.home.page.js";
import CustList from "../page-objects/customer.list.js"
import filereader from "../helpers/file.helper"

const Logger = require('../helpers/logger.js');
const log = new Logger();
let ennConfig
let jsonData
test("NopCommerce Home Page Login", async ({ page, request }, testInfo) => {

    //calling the Env Config
    ennConfig = testInfo.project.use as any

     jsonData=await filereader.readJSON(constants.JsonFilePath.filepath);
  
    // Get the list of the Customer list By using API
   
    const homePaga = new HomePage(page)
    const customerList = new CustList(page)
    let url = "https://admin-demo.nopcommerce.com/Admin/Customer/List"
    await homePaga.loginTonopCommerceWeb(ennConfig.nopCommerceURL, process.env.NOPCOMM_TEST_USER_NAME,
        process.env.NOCOMM_TEST_PASSWORD)
    await customerList.gotoCustomerList(`${ennConfig.nopCommerceURL}${constants.customerListAPI.NopCom_USER_Searc}`)
    await customerList.gotoCustomerLabel()
    
    for(let user of jsonData)
    {
    let customerSearchList = await customerList.searchNameAndConfirm(user.first_name, user. last_name)
    console.log(customerSearchList)

    if (customerSearchList) {
        await log.info(`The given User:${user.first_name}${user. last_name} could not found `);

    } else {
        await log.info(`The given User:${user.first_name}${user. last_name} we found  `)
    }
}
});
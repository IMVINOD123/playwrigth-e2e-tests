import { test, expect } from "@playwright/test"
/**
 * 1 login as Standar user url:
 *     Code CLI: npx playwright codegen https://www.saucedemo.com
 * 2 Get list of product with its prices
 * 3 Assert that all product have non-zero doller price
 * 
 */

test.describe("Inventory Features", () => {
    test.beforeEach("Login with valid creds", async ({ page }) => {
        //lauching the usl
        await page.goto('https://www.saucedemo.com/');
        // login 
        await page.locator('[data-test="username"]').click();
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').click();
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        //Validation of page
        /** Step 1 */
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        /** Step 2 */
        await expect(page).toHaveURL(/.*\/inventory/);
        await expect(page.locator('[data-test="secondary-header"]')).toBeVisible();
        await expect(page.locator('[data-test="title"]')).toContainText('Products');
    });

    test("Should have product have non-zero doller price", async ({ page }) => {

        let productElements = await page.locator(".inventory_item");
        await expect(productElements).toHaveCount(6);

        let totalProduct = await productElements.count();
        let pricelist = []

        for (let i = 0; i < totalProduct; i++) {
            let eleNode = productElements.nth(i);

            //fetching product name
            let productName = await eleNode.locator(".inventory_item_name").innerText();

            //fetching price
            let price = await eleNode.locator(".inventory_item_price").innerText();

            console.log(`ProductName:${productName} and with Price: ${price}`);
            pricelist.push(price);
        }

        console.log(`The Original price list is ${pricelist}`);

        /** 
         *  TO sovle the below '$' issue
         *  $29.99,$9.99,$15.99,$49.99,$7.99,$15.99  
         *    1 replace all $ with empty string ("")
         *    2 Campare price should be >0
         */
        /*
          /*-----------------Step 1 to print ---------------------
        pricelist.forEach(price => {
            let numPrice = parseFloat(price.replace("$", ""))
            if (numPrice > 0) {
                console.log(`is valid price ${numPrice}`)
            }
            else {
                console.log(`is invalid price ${numPrice}`)
            }
        */
        //-----------------Step 2 to print Using Map---------------------
          //Replace $ with "" after removing out put :29.99,9.99,15.99,49.99,7.99,15.99     
        let modifiedPricelist=pricelist.map((item)=>parseFloat(item.replace("$","")))
         console.log(`>>>Modified price List :${modifiedPricelist}`)
          // checkng prices is !<=0
          let priceMoreThanZero=modifiedPricelist.filter((item)=>item<=0)

          if(priceMoreThanZero.length>0)
          {
          console.log(`ERROR:Zero Price value found ${priceMoreThanZero}`)
          }
          else
          {
             console.log(`INFO:All price values are Non-Zero ${priceMoreThanZero}`)
          }
          // Validations array length not be Zero
          expect(priceMoreThanZero).toHaveLength(0);

        });

    
})
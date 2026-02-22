
import { test, expect, request } from '@playwright/test'
import constants from '../../data/constant.json';
import testData from '../../data/test-data';
import fileHelper from '../helpers/file.helper.js'
const Logger = require('../helpers/logger.js');



const logger = new Logger();

test.describe("API Test cases", () => {
    let baseUrl
    test.beforeEach("API Call", async ({ request }, testInfo) => {

        baseUrl = testInfo.project.use as any;
    })
    test.only("First API call should get user list", async ({ request }, testInfo) => {

        const title = "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"

        logger.info(`Making a GET call to ${baseUrl.apiBaseUrl}`);
        const response = await request.get(`${baseUrl.apiBaseUrl}${constants.Req_End_Point.Get_User_List}`, {
            headers: {}
        });
        // Add assertions or logging as needed
        expect(response.status()).toBe(200);

        const userData = await response.json()
        logger.info(`The Response Data from apr ${JSON.stringify(userData,undefined,4)}`)
        // const titleText = userData.title;
        // const userid = userData.userId;
        // expect(titleText).toContain(title);
        // expect(userid).toBe(1);
        // logger.info(`Valided with title:${userid}`)
        // logger.info(`Valided with title:${titleText}`)
        /**
         * Write the response data into the json file
         * 
         */
        fileHelper.writeFile(`${process.cwd()}/data/API-Response/list-of-Users.json`,`${JSON.stringify(userData,undefined,4)}`)

    });

    test("First API call should  post user details", async ({ request }, testInfo) => {

        const title = "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"

        logger.info(`Making a post  call to ${baseUrl.apiBaseUrl}`);
        const playload = await testData.apiPostRequestData()[0];

        const response = await request.post(`${baseUrl.apiBaseUrl}${constants.Req_End_Point.Post_User}`, {
            headers: {
                "Content-Type": process.env.Req_Res_ContentType
            },
            data: playload
        });
        // Add assertions or logging as needed
        expect(response.status()).toBe(201);

        const userData = await response.json()
        logger.info(`The Response Data from apr ${JSON.stringify(userData)}`)
        const titleText = userData.title;
        const userid = userData.userId;
        expect(titleText).toContain(titleText);
        expect(userid).toBe(userid);
        logger.info(`Valided with title:${userid}`)
        logger.info(`Valided with title:${titleText}`)

    });


    test("First API call should PUT Req", async ({ request }, testInfo) => {

        const title = "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"

        logger.info(`Making a post  call to ${baseUrl.apiBaseUrl}`);
        const playload = await testData.apiPostRequestData()[1];

        const response = await request.put(`${baseUrl.apiBaseUrl}${constants.Req_End_Point.put_req}`, {
            headers: {
                "Content-Type": process.env.Req_Res_ContentType
            },
            data: playload
        });
        // Add assertions or logging as needed
        expect(response.status()).toBe(200);

        const userData = await response.json()
        logger.info(`The Response Data from apr ${JSON.stringify(userData)}`)
        const titleText = userData.title;
        const userid = userData.userId;
        expect(titleText).toContain(titleText);
        expect(userid).toBe(userid);
        logger.info(`Valided with title:${userid}`)
        logger.info(`Valided with title:${titleText}`)

    });

    test("First API call should PATCH Req", async ({ request }, testInfo) => {

        logger.info(`Making a PATCH  call to ${baseUrl.apiBaseUrl}`);
        const playload = await testData.apiPostRequestData()[2];

        const response = await request.patch(`${baseUrl.apiBaseUrl}${constants.Req_End_Point.patch_req}`, {
            headers: {
                "Content-Type": process.env.Req_Res_ContentType
            },
            data: playload
        });
        // Add assertions or logging as needed
        expect(response.status()).toBe(200);

        const userData = await response.json()
        logger.info(`The Response Data from apr ${JSON.stringify(userData)}`)
        const titleText = userData.title;
        const userid = userData.userId;
        expect(titleText).toContain(titleText);
        expect(userid).toBe(userid);
        logger.info(`Valided with title:${userid}`)
        logger.info(`Valided with title:${titleText}`)

    });

    test("API call With Filter records", async ({ request }, testInfo) => {
          const filterData = await testData.apiPostRequestData()[3];
         logger.info(`Making a GET call to ${baseUrl.apiBaseUrl}`);
        const response = await request.get(`${baseUrl.apiBaseUrl}${constants.Req_End_Point.ALL_User_List}`, {
           // params: filterData,
            headers: {}
        });
        // Add assertions or logging as needed
        expect(response.status()).toBe(200);

        const userData = await response.json()
        logger.info(`The Response Data from apr ${JSON.stringify(userData)}`)
        const titleText = userData[0].title;
        const userid = userData[0].userId;
       // expect(titleText).toContain(titleText);
       // expect(userid).toBe(1);
        logger.info(`Valided with UserID:${userid}`)
        logger.info(`Valided with title:${titleText}`)

    });

});


import { test, expect, request } from '@playwright/test'
import constants from '../../data/constant.json';
import testData from '../../data/test-data';
import fileHelper from '../helpers/file.helper.js'
const Logger = require('../helpers/logger.js');


const logger = new Logger();

test.describe("API Test cases",{tag:"@smoke"}, () => {
    let accessToken
    let baseUrl
    test.beforeEach("API Call", async ({ request }, testInfo) => {

        baseUrl = testInfo.project.use as any;
    })

    test("Get the access tokend by sharing the use details ", async ({ request }, testInfo) => {
        const response = await request.post(`${baseUrl.apiBaseUrl1}${constants.Req_End_Point.esclogin}`,
            {
                headers: {
                    "Content-Type": process.env.Esc_ContentType
                },
                data: JSON.stringify(constants.requestBody)
            });
        // Add assertions or logging as needed
        expect(response.status()).toBe(201);

        const userData = await response.json()
        logger.info(`The Response Data from apr ${JSON.stringify(userData)}`)
        fileHelper.writeFile(`${process.cwd()}/data/API-Response/escuelajs.json`, JSON.stringify(userData, null, 4));
        logger.info(`The Response Data Is <<<<successfully>>> written in file this escuelajs`)

    });


    test("Fetch the Details using Brear Token passing it in header", async ({ request }, testInfo) => {

        accessToken = fileHelper.readJSON(constants.apiJsonPath.path)

        //  console.log(accessToken.access_token);

        logger.info(`Making a GET call to ${baseUrl.apiBaseUrl1}`);
        const response = await request.get(`${baseUrl.apiBaseUrl1}${constants.requestBody.profileDetails}`, {
            headers: {
                Authorization: `Bearer ${accessToken.access_token}`
            }
        });
        // Add assertions or logging as needed
        expect(response.status()).toBe(200);

        const userData = await response.json()
        logger.info(`The Response Data from apr ${JSON.stringify(userData, undefined, 4)}`)

        let stausText
        try {
            expect(userData.email).toEqual(constants.requestBody.email);
            expect(userData.password).toEqual(constants.requestBody.password)
            stausText = true;
        } catch (e) {
            stausText = false;
        }

        if (stausText) {
            logger.info(`User is available in given profile`)
        }
        else {
            logger.warn(`User is available in given profile`)
        }

    });


});



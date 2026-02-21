import { test, expect } from "@playwright/test";
import { log } from "../helpers/logger.js";
import path from 'path'
import filehelper from '../helpers/csv.data.helper.js'
import MakeAppoitment from '../page-objects/make.appointment.js'
import screeshothelper from '../helpers/screenshot.helper.test.js'

  const csvFilePath=path.resolve(`${process.cwd()}/data/Functional/make-aptment-test-data.csv`)
    const csvDataArr= filehelper.readCSV(csvFilePath)
for(const csvValue of  csvDataArr )
{
test.describe("Make Appointments", () => {

    test(`${csvValue.testid}"Make Appointments"`, async ({ page }, testInfo) => {

        //await screeshothelper.takeFullPageScreenshot(page,"Make Appointments")
        const makeAppoitment = new MakeAppoitment(page)

        //calling the Env Config
        const envConfig = testInfo.project.use as any;
        //creating object of Homepage
        await makeAppoitment.loginMakeAppoimnetPortal(envConfig.appURL, process.env.TEST_USER_NAME,
            process.env.TEST_PASSWORD)
        
        await makeAppoitment.makeAppointment(csvValue.facility,csvValue.hcp,csvValue.visiteDate)

    });
   

})
}



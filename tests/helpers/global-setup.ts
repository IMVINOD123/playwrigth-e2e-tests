import { type FullConfig } from '@playwright/test';
import path from 'path';
import fs from 'fs';
export default async function globalSetup(config: FullConfig) {

    console.log(`[INFO]:Started Deleting process`);
    /** Delete all file from allure-results */
    let resultDir = path.resolve(process.cwd(), "allure-results")
    console.log(`>>>>>>allure Result path ${resultDir}`)
    if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
        console.log(`[INFO]:Fund Deleting file from local One`);
        if (fs.existsSync(resultDir)) {
            fs.rmSync(resultDir, {
                recursive: true, force: true

            })
            console.log(`[INFO]:Fund Deleting file from local One`);
        }
    }

    console.log(`[INFO]:Completed Deleting process`);

    // set up the login cookies gloabal variable 

    process.env.LONGIN_COOKIES=undefined
}
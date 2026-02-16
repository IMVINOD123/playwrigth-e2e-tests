import type { FullConfig } from '@playwright/test';
import { exec } from "child_process"

export default async function globalTeardown(config: FullConfig) {

    console.log(`[INFO]:Started Automatic process of opening an allure report`);
    if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
        exec("allure serve", (error, stdout, stderr) => {
            if(error)
            {
                console.error(`Error:Starting allure serve`,error.message);
            }
        });
        console.log(`[INFO]:Completed  allure report`);
    }
     
}

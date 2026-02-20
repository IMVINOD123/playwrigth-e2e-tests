import { defineConfig, devices } from "@playwright/test"
import { baseConfig } from "../playwright.config"
import { EnvConfig } from "../tests/helpers/config-fixtures"
import path from "path"

console.log(`..>>>>Started Execution in QA <<<<<<....`)
export default defineConfig<EnvConfig>({

    ...baseConfig, // Load the all config details here
    testDir: path.resolve(process.cwd(), "./tests"),
    use: {
        ...baseConfig.use,
        envName: "test",
        appURL: "https://katalon-demo-cura.herokuapp.com/",
        nopCommerceURL: "https://admin-demo.nopcommerce.com/",
        dbConfig: {
            serverName: '',
            dbName: '',
            connectionStr: ''
        }
    }
});


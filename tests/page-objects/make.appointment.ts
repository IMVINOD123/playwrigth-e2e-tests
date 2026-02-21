import BasePage from "./base.page.js";
import { expect, type Page } from "@playwright/test";
import path from 'path'
import filehelper from '../helpers/csv.data.helper';
import takescreenshot from '../helpers/screenshot.helper.test.js'

const Logger = require('../helpers/logger.js');

const log = new Logger();

class MakeAppointment extends BasePage {
    constructor(page: Page) {
        super(page);
    }

     bookapoiment:string="Book Appointment";
     appoitmentConfirmation="Appointment Confirmation"
     selectOptionText="Facility"

    // static async getFileData():Promise<any[]>
    // {
    // const csvFilePath=path.resolve(`${process.cwd()}/data/Functional/make-aptment-test-data.csv`)
    // return filehelper.readCSV(csvFilePath)
    // }
    /* Elements */
    get usernameInputBox() {
        return this.page.getByRole("textbox", { name: "Email:" });
    }
    get passwordInputBox() {
        return this.page.getByRole("textbox", { name: "Password:" });
    }
    get loginBtn() {
        const loginRegex = /Log\s*in/i;
        return this.page.getByRole("button", { name: loginRegex });
    }


    get usernameInputBoxByLable() {
        // return this.page.getByLabel("textbox", { name: "Username:" });
        return this.page.getByLabel("Username")
    }
    get passwordInputBoxByLable() {
        //return this.page.getByLabel("textbox", { name: "Password:" });
        return this.page.getByLabel("Password")
    }

    makeAppoitment() {
        return this.page.getByRole('heading', { name: 'Make Appointment' })
    }

    selectcheckBoxByName() {
        return this.page.getByRole('checkbox', { name: 'Apply for hospital readmission' })
    }
    slectCheckBoxByName(radio: string) {
        return this.page.getByRole('radio', { name: radio })
    }



    selectOptionByLabel() {
        return this.page.getByLabel("Facility");
    }
    clickingByRoleTextBox() {
        return this.page.getByRole('textbox', { name: 'Visit Date (Required)' });
    }

    textIntoCommentBox() {
        return this.page.getByRole('textbox', { name: 'Comment' })
    }
 
     bookAppoimentsByText()
     {
        return this.page.getByRole('button', { name:this.bookapoiment })
     }

     appoitmentConfirmationText()
     {
        return this.page.getByRole('heading',{name:this.appoitmentConfirmation})
     }
    /* Page Actions */
    async loginMakeAppoimnetPortal(url: string, username: string, password: string) {
        try {
            await log.info(`Login to :${url} with ${username}`);
            await this.navigateTo(url);
            await expect(this.page).toHaveTitle("CURA Healthcare Service");
            await expect(this.page.locator("//h1")).toHaveText("CURA Healthcare Service");
            await this.page.getByRole("link", { name: "Make Appointment" }).click();

            await this.usernameInputBoxByLable.fill(username);
            await this.passwordInputBoxByLable.fill(password);

            await this.click(this.loginBtn);

            await expect(this.page.getByText('Make Appointment').nth(1)).toBeVisible();



        } catch (err) {
            (err as Error).message = `Failed login to Make Appointment web: ${url}, with username: ${username}`;
            throw err;
        }
    }

    async makeAppointment(facility: string, hpc: string ,visiteDate: string, ) {
        try {

            await this.selectOption(this.selectOptionText,facility,)

          //  await this.selectOptionByLabel().selectOption(facility);
            log.info(`${facility}:User selected Options from Base Class reusable method`)

            await this.makeAppoitment().click();
            //check box
            await this.selectcheckBoxByName().check();
            //radio
            await this.slectCheckBoxByName(hpc).check();
            log.info(`${hpc}:User selected HPC`)
            //Date fields

            //Date fields
            await this.clickingByRoleTextBox().click();
            await this.clickingByRoleTextBox().fill(visiteDate);
            log.info(`${visiteDate}:User selected Date`)
            await this.clickingByRoleTextBox().press('Enter');
            await this.textIntoCommentBox().click();
            await this.textIntoCommentBox().fill('this is multiline comments');
            //button Appointment
            await this.bookAppoimentsByText().click();
            let isvisible=this.appoitmentConfirmationText().isVisible;
            if(!isvisible)
            {
                await takescreenshot.takeElementScreenshot(this.appoitmentConfirmationText(),"Make Appointment")
            }
            
            await this.page.getByText('Please be informed that your').click();
            await this.page.getByRole('link', { name: 'Go to Homepage' }).click();
            await expect(this.page.getByRole('link', { name: 'Make Appointment' })).toBeVisible();

        }
        catch (err) {
            (err as Error).message = `Failed login to Make Appointment web:`;
            throw err;
        }
    }


}

export default MakeAppointment;

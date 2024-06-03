import { expect, type Locator, type Page } from '@playwright/test';
import landingPageElement from '../Data/landing_page_variables.json';


export class LandingPage {
    readonly page: Page;
    readonly userNameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly headingerror: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userNameInput = page.locator("#user-name");
        this.passwordInput = page.locator("#password");
        this.loginButton = page.locator("#login-button");
        this.headingerror = page.locator("[data-test='error']");
    }

    async connectionWithValidAccount() {
        await this.userNameInput.fill(landingPageElement.nameValid)
        await this.passwordInput.fill(landingPageElement.password)
        await this.loginButton.click()

    }
  

    async connectionAccount(username,password) {
        await this.userNameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()

    }
 

}


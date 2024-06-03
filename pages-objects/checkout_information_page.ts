import { expect, type Locator, type Page } from '@playwright/test';
import checkoutInformationPageElement from '../Data/checkout_information_page_variables.json'


export class CheckoutInformationPage {
    readonly page: Page;
    readonly firstNameCheckoutLocator: Locator;
    readonly lastNameCheckoutLocator: Locator;
    readonly postalCodeCheckoutLocator: Locator;
    readonly continueButtonLocator: Locator;
    readonly checkoutButtonLocator: Locator;
    readonly titleLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameCheckoutLocator = page.locator("#first-name");
        this.lastNameCheckoutLocator = page.locator("#last-name");
        this.postalCodeCheckoutLocator = page.locator("#postal-code");
        this.continueButtonLocator = page.locator("#continue");
        this.checkoutButtonLocator = page.locator("#checkout");
        this.titleLocator = page.getByText('Checkout: Your Information')
    }

    async goToCheckout() {
        await this.checkoutButtonLocator.click()
    }

    async checkoutCustomerInformations() {
        await this.firstNameCheckoutLocator.fill(checkoutInformationPageElement.firstNameValue)
        await this.lastNameCheckoutLocator.fill(checkoutInformationPageElement.lastNameValue)
        await this.postalCodeCheckoutLocator.fill(checkoutInformationPageElement.postalCodeValue)
        await this.page.waitForTimeout(2000)
    }

    async continueCheckoutAction() {
        await this.continueButtonLocator.click()
    }

}











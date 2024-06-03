import { expect, type Locator, type Page } from '@playwright/test';
import checkoutOverviewPageElement from '../Data/checkout_overview_page_variables.json';


export class CheckoutOverviewPage {
    readonly page: Page;
    readonly finishButtonLocator: Locator;
    readonly titleCheckoutOverview: Locator;


    constructor(page: Page) {
        this.page = page;
        this.finishButtonLocator = page.locator("[data-test='finish']");
        this.titleCheckoutOverview = page.locator('[data-test="title"]')
    }

    async finishOrder() {
        await this.finishButtonLocator.click()
    }

}











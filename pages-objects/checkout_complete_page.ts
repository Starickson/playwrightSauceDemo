import { expect, type Locator, type Page } from '@playwright/test';
import checkoutCompletePageElement from '../Data/checkout_complete_page_variables.json'



export class CheckoutCompletePage {
    readonly page: Page;
    readonly backToProductsButton: Locator;
    readonly completeHeaderLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.backToProductsButton = page.locator("[data-test='back-to-products']"),
            this.completeHeaderLocator = page.locator("[data-test='complete-header']")
    }

    async bactToProducts() {
        await this.backToProductsButton.click()
    }

}











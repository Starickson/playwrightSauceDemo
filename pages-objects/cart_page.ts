import { expect, type Locator, type Page } from '@playwright/test';
import cartPageElement from '../Data/cart_page_variables.json'



export class CartPage {
    readonly page: Page;
    readonly shoppingCartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shoppingCartLink = page.locator("[data-test='shopping-cart-link']")
    }

    async goToCart() {
        await this.shoppingCartLink.click();

    }

}











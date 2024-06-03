import { expect, type Locator, type Page } from '@playwright/test';
import inventoryPageElement from '../Data/inventory_page_variables.json';

export class InventoryPage {
    readonly page: Page;
    readonly addTocartFromInventoryLocator: Locator;
    readonly cartLinkLocator: Locator;
    readonly checkoutButtonLocator: Locator;
    readonly goToProductDetailsLinkLocator: Locator;
    readonly listOfSelectedProductsLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addTocartFromInventoryLocator = page.locator("//button[contains(., 'Add to cart')]");
        this.cartLinkLocator = page.locator("[data-test='shopping-cart-link']");
        this.checkoutButtonLocator = page.locator("#checkout");
        this.goToProductDetailsLinkLocator = page.locator("(//div[@class='inventory_item_label'])[2]/a");
        this.listOfSelectedProductsLocator = page.locator("(//div[@data-test='inventory-item-price'])");
    }

    async filterProductHighToLow() {
        await this.page.selectOption("//select[@data-test='product-sort-container']", inventoryPageElement.hilo);
    }

    async filterProductLowToHigh() {
        await this.page.selectOption("//select[@data-test='product-sort-container']", inventoryPageElement.lohi);
    }

    async selectTwoProducts() {
        // Sélection du premier élément
        await this.addTocartFromInventoryLocator.nth(0).click();

        // Sélection du second élément
        await this.addTocartFromInventoryLocator.nth(0).click();
    }


    async selectThesecondProduct() {
        // Sélection du premier élément
        await this.addTocartFromInventoryLocator.nth(1).click();
    }

    async goToCart() {
        await this.cartLinkLocator.click();
    }

    async goToCheckout() {
        await this.checkoutButtonLocator.click()
    }

    async gotoDetailsProduct() {
        await this.goToProductDetailsLinkLocator.click()
    }

    async returnTabSelected() {
        await this.listOfSelectedProductsLocator
    }

    async countElementsSelected() {
        await this.listOfSelectedProductsLocator.count()
    }




}











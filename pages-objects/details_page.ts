import { expect, type Locator, type Page } from '@playwright/test';
import detailsPageElement from '../Data/details_page_variables.json';

export class DetailsPage {
    readonly page: Page;
    readonly addToCartLocator: Locator;
    readonly shoppingCartLinkLocator: Locator;
    readonly productTitleLocator: Locator;
    readonly productDescLocator: Locator;
    readonly productPriceLocator: Locator;
    readonly cartLinkLocator: Locator;
    readonly productImageLocator: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartLocator = page.locator("#add-to-cart");
        this.shoppingCartLinkLocator = page.locator("//a[@data-test='shopping-cart-link']");
        this.productTitleLocator = page.locator('//div[@class="inventory_details_name large_size"]');
        this.productDescLocator = page.locator('//div[@class="inventory_details_desc large_size"]');
        this.productPriceLocator = page.locator('//div[@class="inventory_details_price"]');
        this.cartLinkLocator = page.locator('//a[@data-test="shopping-cart-link"]');
        this.productImageLocator = page.locator('//img[@class="inventory_details_img"]');
        this.cartBadge = page.locator('//a/span[@data-test="shopping-cart-badge"]');

    }

    async addToCart() {
        await this.addToCartLocator.click()
    }

    async goToCartFromDetailsPage() {
        await this.shoppingCartLinkLocator.click()
    }








}











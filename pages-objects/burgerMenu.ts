import { expect, type Locator, type Page } from '@playwright/test';

export class BurgerMenuPage {
    readonly page: Page;
    readonly menuBurgerButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuBurgerButton = page.locator("#react-burger-menu-btn");
        this.logoutButton = page.locator("#logout_sidebar_link");
    }

    async logoutFromInventoryPage() {
        await this.menuBurgerButton.click()
        await this.logoutButton.click()
    }

}











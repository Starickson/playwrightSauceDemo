import { test, expect, type Page } from '@playwright/test';
import { CartPage } from '../pages-objects/cart_page.ts'
import { CheckoutCompletePage } from '../pages-objects/checkout_complete_page.ts'
import { CheckoutInformationPage } from '../pages-objects/checkout_information_page.ts'
import { CheckoutOverviewPage } from '../pages-objects/checkout_overview_page.ts'
import { InventoryPage } from '../pages-objects/inventory_page.ts'
import { LandingPage } from '../pages-objects/landing_page.ts'
import { DetailsPage } from '../pages-objects/details_page.ts'
import data from '../Data/variables.json'
import { FonctionUtiles } from '../utilitaire/fonctions.ts';
import { BurgerMenuPage } from '../pages-objects/burgerMenu.ts';


test.describe('Exercicies dans le cadre des jours TP VALIDATION Framework ', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(data.base_url);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Exercice 1', async ({ page }) => {
    await expect(page).toHaveURL(data.base_url)
    const landingPage = new LandingPage(page);
    const burgerMenu = new BurgerMenuPage(page)
    await landingPage.connectionAccount(data.nameValid, data.password)
    await burgerMenu.logoutFromInventoryPage()

  });

  test('Exercice 2', async ({ page }) => {
    await expect(page).toHaveURL(data.base_url)
    const landingPage = new LandingPage(page);
    await landingPage.connectionAccount(data.nameInvalid, data.password)
    await expect(landingPage.headingerror).toBeVisible();
  });


  test('Exercice 3', async ({ page }) => {
    await expect(page).toHaveURL(data.base_url)
    const landingPage = new LandingPage(page);
    const cartPage = new CartPage(page);
    const checkout_information_page = new CheckoutInformationPage(page);
    const checkout_complete_page = new CheckoutCompletePage(page);
    const checkout_overview_page = new CheckoutOverviewPage(page);
    const inventory_page = new InventoryPage(page);

    await landingPage.connectionWithValidAccount();
    await inventory_page.filterProductHighToLow()
    await page.waitForTimeout(1000)

    // Sélection du premier élément
    await inventory_page.selectTwoProducts()

    //COmparaison du nombre d'articles 
    await inventory_page.countElementsSelected()

    // go to cart 
    await cartPage.goToCart()
    await checkout_information_page.goToCheckout()

    //checkout page
    await expect(checkout_information_page.titleLocator).toBeVisible()
    await expect(page).toHaveURL(data.checkout_url)

    await checkout_information_page.checkoutCustomerInformations()
    await checkout_information_page.continueCheckoutAction()
    await expect(page).toHaveURL(data.checkout_url_step_two)
    await expect(checkout_overview_page.titleCheckoutOverview).toHaveText(data.checkoutOverviewTitle)
    await checkout_overview_page.finishOrder()
    await expect(checkout_complete_page.completeHeaderLocator).toHaveText(data.checkoutCompletMessage)
    await checkout_complete_page.bactToProducts()
    await expect(page).toHaveURL(data.inventory_url)

  });


  test('Exercice 4 du plus grand au plus petit ', async ({ page }) => {
    const landingPage = new LandingPage(page);
    const inventory_page = new InventoryPage(page);
    const fonctionUtiles = new FonctionUtiles(page);

    await expect(page).toHaveURL(data.base_url)
    await landingPage.connectionWithValidAccount();
    await page.waitForTimeout(1000)
    await inventory_page.filterProductHighToLow()
    await page.waitForTimeout(1000)

    const liste: string[] = [];

    let long = await fonctionUtiles.productsArrayLength(page)

    await fonctionUtiles.loopArrayProducts(page, liste, long)

    for (let j = 1; j < long; j++) {
      if (liste[j - 1] > liste[j]) {
        await expect(+(liste[j - 1])).toBeGreaterThan(+(liste[j]))
      }
    }

  });

  test('Exercice 4 du plus petit au plus grand  ', async ({ page }) => {
    const landingPage = new LandingPage(page);
    const inventory_page = new InventoryPage(page);
    const fonctionUtiles = new FonctionUtiles(page);

    await expect(page).toHaveURL(data.base_url)
    await landingPage.connectionWithValidAccount();
    await page.waitForTimeout(1000)
    await inventory_page.filterProductLowToHigh()
    await page.waitForTimeout(1000)

    //initialisation d'un tabelau vide avec typage 
    const liste: string[] = [];

    let long = await fonctionUtiles.productsArrayLength(page)

    await fonctionUtiles.loopArrayProducts(page, liste, long)

    for (let j = 10; j < long; j++) {
      await expect(+(liste[j])).toBeLessThan(+(liste[j + 1]))
    }

  });


  test('Exercice 5 le one for all ', async ({ page }) => {
    await expect(page).toHaveURL(data.base_url)

    const landingPage = new LandingPage(page);
    const inventory_page = new InventoryPage(page);
    const details_page = new DetailsPage(page);
    const fonctionUtiles = new FonctionUtiles(page);

    await landingPage.connectionWithValidAccount();
    await page.waitForTimeout(3000)
    await inventory_page.gotoDetailsProduct()
    await page.waitForTimeout(3000)

    //Vérifications -----
    await expect(details_page.productTitleLocator).toBeVisible()
    await expect(details_page.productDescLocator).toBeVisible()
    await expect(details_page.productPriceLocator).toBeVisible()
    await expect(details_page.cartLinkLocator).toBeVisible()
    await expect(details_page.productImageLocator).toBeVisible()
    //------
    await details_page.addToCart()
    await expect(details_page.cartBadge).toHaveText(data.cartNumberOfProducts)
    await details_page.goToCartFromDetailsPage()
    let long = await fonctionUtiles.cartProductsLength(page)
    await expect(long).toBe(1)
    await expect(long).toEqual(1)

  });

});




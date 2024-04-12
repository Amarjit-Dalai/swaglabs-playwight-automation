import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page'
import { ProductPage} from '../page-objects/products-page'

let loginPage: LoginPage
let productPage: ProductPage

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    productPage = new ProductPage(page)
    await page.goto('/')
});

test('TC01: Login Success for Standard User', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(productPage.productTitle).toContainText('Products');
});

test('TC02: Login Failure for Incorrect Credentials',{ tag: ['@login', '@regression'] }, async ({ page }) => {
    await loginPage.login('test', 'secret')
    await expect(loginPage.incorrectCredentialsMessage).toContainText('Username and password do not match any user in this service');
});

test('TC03: Add Product to Cart', async ({ page }) => {
    const productName = 'Sauce Labs Fleece Jacket'
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(productPage.productTitle).toContainText('Products');
    const emptyCart = await productPage.getShoppingCartBadgeNumber()
    await productPage.addToCartButton(productName).click()
    await expect(productPage.removeButtonByText(productName)).toBeVisible()
    const cartBadgeNumber = await productPage.getShoppingCartBadgeNumber()
    await expect(cartBadgeNumber).toBe(emptyCart + 1)
});

test('TC04: Add Multiple products to Cart', async ({ page }) => {
    const products = ['Sauce Labs Fleece Jacket', 'Sauce Labs Onesie', 'Sauce Labs Backpack']
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(productPage.productTitle).toContainText('Products');
    await productPage.addProductsToCart(products)
});

test('TC05: Remove Product from Cart', async ({ page }) => {
    const productName = 'Sauce Labs Fleece Jacket'
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(productPage.productTitle).toContainText('Products');
    const emptyCart = await productPage.getShoppingCartBadgeNumber()
    await productPage.addToCartButton(productName).click()
    await expect(productPage.removeButtonByText(productName)).toBeVisible()
    await productPage.removeButtonByText(productName).click()
    const cartBadgeNumber = await productPage.getShoppingCartBadgeNumber()
    await expect(productPage.addToCartButton(productName)).toBeVisible()
    await expect(cartBadgeNumber).toBe(emptyCart)
});

test.skip('TC06: Checkout Product', async ({ page }) => {
    const products = ['Sauce Labs Fleece Jacket', 'Sauce Labs Onesie', 'Sauce Labs Backpack']
    await page.goto('/')
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(productPage.productTitle).toContainText('Products');
    await productPage.addProductsToCart(products)
});

test.skip('TC07: Logout Success', async ({ page }) => {
    const products = ['Sauce Labs Fleece Jacket', 'Sauce Labs Onesie', 'Sauce Labs Backpack']
    await page.goto('/')
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(productPage.productTitle).toContainText('Products');
    await productPage.addProductsToCart(products)
});


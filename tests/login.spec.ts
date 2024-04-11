import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/loginPage'
import { ProductPage} from '../page-objects/productPage'

test('Login Success for Standard User', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const productPage = new ProductPage(page)
    await page.goto('/')
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(productPage.productTitle).toContainText('Products');
});

test('Login Failure for Incorrect Credentials',{ tag: ['@login', '@regression'] }, async ({ page }) => {
    const loginPage = new LoginPage(page)
    await page.goto('/')
    await loginPage.login('test', 'secret')
    await expect(loginPage.incorrectCredentialsMessage).toContainText('Username and password do not match any user in this service');
});


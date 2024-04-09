import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/loginPage'
import { ProductPage} from '../page-objects/productPage'

test('Log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const productPage = new ProductPage(page)
    await page.goto('/')
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(productPage.productTitle).toContainText('Products');
});

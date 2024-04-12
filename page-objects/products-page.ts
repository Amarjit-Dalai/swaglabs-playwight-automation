import { test, expect, Page, Locator } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly productTitle: Locator
    readonly productsContainer: Locator;
    readonly productItemByText: (productName: string) => Locator;
    readonly addToCartButton: (productName: any) => Locator;
    readonly removeButtonByText: (productName: any) => Locator;
    readonly productItemByIndex: (index: any) => Locator;
    readonly firstAddToCartButton: (index: any) => any;
    readonly shoppingCartBadge: Locator;


    constructor(page: Page) {
        this.page = page;
        this.productTitle = page.locator('[data-test="title"]')
        this.productsContainer = page.locator('[data-test="inventory-container"]')
        this.productItemByText = (productName) => this.page.locator('[data-test="inventory-list"] div').filter({ hasText: productName }).first()
        this.addToCartButton = (productName) => this.productItemByText(productName).getByRole('button', { name: 'Add to Cart' })
        this.removeButtonByText = (productName) => this.productItemByText(productName).getByRole('button', { name: 'Remove' })
        this.productItemByIndex = (index) => this.page.locator('[data-test="inventory-list"] div').nth(index)
        this.firstAddToCartButton = (index) => this.productItemByIndex(index).getByRole('button', { name: 'Add to Cart' })
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]')
    }

    async getShoppingCartBadgeNumber() {
        let itemCount;
        if (await this.shoppingCartBadge.isVisible()) {
            const shoppingCartBadgeText = await this.shoppingCartBadge.textContent();
            if (shoppingCartBadgeText !==null){
            itemCount = parseInt(shoppingCartBadgeText);
            }
            if (isNaN(itemCount)) {
                console.error('The text obtained is not a number');
                return 0;
            }

            return itemCount;
        } else {
            console.log("There is no item visible on the Shopping Cart Badge");
            return 0;
        }
    }

    async addProductsToCart(products:Array<string>){
        const emptyCart = await this.getShoppingCartBadgeNumber()
        for (const product of products) {
            await this.addToCartButton(product).click()
            await expect(this.removeButtonByText(product)).toBeVisible()
        }
        const cartBadgeNumber = await this.getShoppingCartBadgeNumber()
        await expect(cartBadgeNumber).toBe(emptyCart + products.length)
    }

}
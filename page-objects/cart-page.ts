import { Page } from "@playwright/test";


export class CartPage {
    readonly page: Page
    readonly yourCartTitle: any;
    readonly cartListContainer: any;
    readonly cartItemByText: any;

    constructor(page:Page) {
        this.page = page;
        this.yourCartTitle = page.locator('[data-test="title"]')
        this.cartListContainer = page.locator('[data-test="cart-list"]')
        this.cartItemByText = (text:string) => this.page.locator(`//div[@class="cart_item"]//*[text()="${text}"]`)

    }


}
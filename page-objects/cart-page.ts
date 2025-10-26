import { Page, expect } from "@playwright/test";


export class CartPage {
    readonly page: Page
    readonly yourCartTitle: any;
    readonly cartListContainer: any;
    readonly cartItemByText: any;
    readonly checkoutButton: any;
    readonly firstNameInput: any;
    readonly lastNameInput: any;
    readonly postalCodeInput: any;
    readonly continueButton: any;
    readonly finishButton: any;
    readonly thanksForOrderMessage: any;
    readonly checkoutConfirmationMessage: any;
    readonly checkoutTitle: any;

    constructor(page: Page) {
        this.page = page;
        this.yourCartTitle = page.locator('//*[@class="title" and contains(.,"Your Cart")]')
        this.cartListContainer = page.locator('[data-test="cart-list"]')
        this.cartItemByText = (text: string) => this.page.locator(`//div[@class="cart_item"]//*[text()="${text}"]`)
        this.checkoutButton = page.locator('[id=checkout]')

        //checkout items
        this.firstNameInput = page.locator('[data-test="firstName"]')
        this.lastNameInput = page.locator('[data-test="lastName"]')
        this.postalCodeInput = page.locator('[data-test="postalCode"]')
        this.continueButton = page.locator('[data-test="continue"]')
        this.finishButton = page.locator('[data-test="finish"]')
        this.thanksForOrderMessage = page.locator('[data-test="complete-header"]')
        this.checkoutConfirmationMessage = page.locator('[data-test="complete-text"]')
        this.checkoutTitle = page.locator('[data-test="title"]')

    }

    async validateProductItemsAreDisplayed(products: { name: string; description: string; price: string; }[]) {
        for (const product of products) {
            await expect(this.cartItemByText(product.name)).toBeVisible
        }
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName)
        await this.lastNameInput.fill(lastName)
        await this.postalCodeInput.fill(postalCode)
    }

    async validateCheckoutWasSuccessfully() {
        await expect(this.thanksForOrderMessage).toContainText('Thank you for your order!');
        await expect(this.checkoutConfirmationMessage).toContainText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        await expect(this.checkoutTitle).toContainText('Checkout: Complete!');

    }
}
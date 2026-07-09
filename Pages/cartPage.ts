import { Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class CartPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // Locators
    readonly subscriptionHeading = this.page.getByRole('heading', { name: 'Subscription' });
    readonly emailInput = this.page.getByRole('textbox', { name: 'Your email address' });
    readonly subscribeButton = this.page.locator('#subscribe');
    readonly successMessage = this.page.getByText('You have been successfully subscribed!');
    readonly cartHeading = this.page.getByText('Shopping Cart');
    readonly emptyCartMessage = this.page.getByText('Cart is empty!');
    readonly removeProductButton = this.page.locator('.cart_quantity_delete');

    // Actions
    async navigateToCart() {
        await this.page.getByRole('link', { name: ' Cart' }).click();
    }

    async verifySubscriptionSectionIsVisible() {
        await expect(this.subscriptionHeading).toBeVisible();
    }

    async verifyCartPageIsVisible() {
        await expect(this.cartHeading).toBeVisible();
    }

    async removeProductFromCart() {
        await this.removeProductButton.click();
    }

    async verifyCartIsEmpty() {
        await expect(this.emptyCartMessage).toBeVisible();
    }

    async subscribeWithEmail(email: string) {
        await this.emailInput.fill(email);
        await this.subscribeButton.click();
    }

    async verifySubscriptionSuccess() {
        await expect(this.successMessage).toBeVisible();
    }

    async subscribeAndVerify(email: string) {
        await this.subscribeWithEmail(email);
        await this.verifySubscriptionSuccess();
    }

    // Product verification methods
    async verifyProductIsInCart(productId: number) {
        await expect(this.page.locator(`#product-${productId}`)).toBeVisible();
    }

    async verifyProductNameInCart(productName: string) {
        await expect(this.page.getByRole('link', { name: productName })).toBeVisible();
    }

    async verifyProductDetails(productId: number, price: string, quantity: string, total: string) {
        const productLocator = this.page.locator(`#product-${productId}`);
        await expect(productLocator.locator('.cart_price')).toContainText(price);
        await expect(productLocator.locator('.cart_quantity')).toContainText(quantity);
        await expect(productLocator.locator('.cart_total')).toContainText(total);
    }

    async verifyMultipleProductsInCart(products: Array<{ id: number; price: string; quantity: string; total: string }>) {
        for (const product of products) {
            await this.verifyProductIsInCart(product.id);
            await this.verifyProductDetails(product.id, product.price, product.quantity, product.total);
        }
    }

    async verifyQuantityInCart(quantity: string) {
        await expect(this.page.getByRole('button', { name: quantity })).toBeVisible();
    }
}

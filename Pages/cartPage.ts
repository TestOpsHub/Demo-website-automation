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

    // Actions
    async navigateToCart() {
        await this.page.getByRole('link', { name: ' Cart' }).click();
    }

    async verifySubscriptionSectionIsVisible() {
        await expect(this.subscriptionHeading).toBeVisible();
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
}

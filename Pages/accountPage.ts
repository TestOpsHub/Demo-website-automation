import { Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class AccountPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // Locators
    readonly accountCreatedMessage = this.page.getByText('Account Created!');
    readonly continueLink = this.page.getByRole('link', { name: 'Continue' });
    readonly loggedInAsText = (name: string) => this.page.getByText(`Logged in as ${name}`);
    readonly deleteAccountLink = this.page.getByRole('link', { name: ' Delete Account' });
    readonly accountDeletedMessage = this.page.getByText('Account Deleted!');

    // Actions
    async verifyAccountCreated() {
        await expect(this.accountCreatedMessage).toBeVisible();
    }

    async clickContinue() {
        await this.continueLink.click();
    }

    async verifyLoggedInUser(userName: string) {
        await expect(this.loggedInAsText(userName)).toBeVisible();
    }

    async clickDeleteAccount() {
        await this.deleteAccountLink.click();
    }

    async verifyAccountDeleted() {
        await expect(this.accountDeletedMessage).toBeVisible();
    }
}

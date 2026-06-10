import { Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginSignupPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // Locators
    readonly newUserSignupHeading = this.page.getByRole('heading', { name: 'New User Signup!' });
    readonly signupNameInput = this.page.getByRole('textbox', { name: 'Name' });
    readonly signupEmailInput = this.page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
    readonly signupButton = this.page.getByRole('button', { name: 'Signup' });

    // Actions
    async verifyLoginSignupPageIsVisible() {
        await expect(this.newUserSignupHeading).toBeVisible();
    }

    async fillSignupForm(name: string, email: string) {
        await this.signupNameInput.fill(name);
        await this.signupEmailInput.fill(email);
    }

    async clickSignupButton() {
        await this.signupButton.click();
    }

    async signupWithDetails(name: string, email: string) {
        await this.fillSignupForm(name, email);
        await this.clickSignupButton();
    }
}

import { Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginSignupPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // Signup Locators
    readonly newUserSignupHeading = this.page.getByRole('heading', { name: 'New User Signup!' });
    readonly signupNameInput = this.page.getByRole('textbox', { name: 'Name' });
    readonly signupEmailInput = this.page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
    readonly signupButton = this.page.getByRole('button', { name: 'Signup' });

    // Login Locators
    readonly loginHeading = this.page.getByRole('heading', { name: 'Login to your account' });
    readonly loginEmailInput = this.page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
    readonly loginPasswordInput = this.page.getByRole('textbox', { name: 'Password' });
    readonly loginButton = this.page.getByRole('button', { name: 'Login' });
    readonly loginErrorMessage = this.page.locator('#form').filter({ hasText: 'Your email or password is incorrect!' });

    // Signup Actions
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

    // Login Actions
    async verifyLoginPageIsVisible() {
        await expect(this.loginHeading).toBeVisible();
    }

    async fillLoginForm(email: string, password: string) {
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async loginWithCredentials(email: string, password: string) {
        await this.fillLoginForm(email, password);
        await this.clickLoginButton();
    }

    async verifyLoginErrorMessage() {
        await expect(this.loginErrorMessage).toBeVisible();
    }
}

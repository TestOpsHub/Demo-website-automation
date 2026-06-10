import { Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // Locators
    readonly automationExerciseHeading = this.page.getByRole('heading', { name: 'AutomationExercise' }).locator('span');
    readonly practiceWebsiteHeading = this.page.getByRole('heading', { name: 'Full-Fledged practice website' });
    readonly loginLink = this.page.locator('a[href="/login"]');

    // Actions
    async navigateToHome() {
        await this.navigateTo('/');
    }

    async verifyHomePageIsVisible() {
        await expect(this.automationExerciseHeading).toBeVisible();
        await expect(this.practiceWebsiteHeading).toBeVisible();
    }

    async clickLoginLink() {
        await this.loginLink.click();
    }
}

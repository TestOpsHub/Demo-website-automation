import {test, expect} from '@playwright/test';
import { HomePage } from '../../../Pages/homePage';
import { LoginSignupPage } from '../../../Pages/loginSignupPage';
import { AccountPage } from '../../../Pages/accountPage';

test.describe('Login Feature', ()=>{
    test('Verify user can login with valid credentials', async({page, baseURL})=>{
        const email = process.env.EMAIL!;
        const password = process.env.PASSWORD!;
        const username = process.env.LOGIN_USERNAME!;

        const homePage = new HomePage(page);
        const loginSignupPage = new LoginSignupPage(page);
        const accountPage = new AccountPage(page);

        // Navigate to home page
        await homePage.navigateTo('/');

        // Navigate to Login/Signup page
        await homePage.clickLoginLink();

        // Verify Login page is visible
        await loginSignupPage.verifyLoginPageIsVisible();

        // Login with credentials from .env
        await loginSignupPage.loginWithCredentials(email, password);

        // Verify successful login by checking the logged in username
        await accountPage.verifyLoggedInUser(username);

        // Logout
        await page.getByRole('link', { name: ' Logout' }).click();
    })
    
})
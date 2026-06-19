import {test, expect} from '@playwright/test';
import { HomePage } from '../../../Pages/homePage';
import { LoginSignupPage } from '../../../Pages/loginSignupPage';
import { AccountPage } from '../../../Pages/accountPage';
import process from 'process';

test.describe('Login Feature', ()=>{
    let homePage: HomePage;
    let loginSignupPage: LoginSignupPage;
    let accountPage: AccountPage;

    test.beforeEach(async({page})=>{
        homePage = new HomePage(page);
        loginSignupPage = new LoginSignupPage(page);
        accountPage = new AccountPage(page);

        // Navigate to home page and login page
        await homePage.navigateTo('/');
        await homePage.clickLoginLink();
        await loginSignupPage.verifyLoginPageIsVisible();
    });

    test('Verify user can login with valid credentials', async({page})=>{
        const email = process.env.EMAIL!;
        const password = process.env.PASSWORD!;
        const username = process.env.LOGIN_USERNAME!;

        // Login with credentials from .env
        await loginSignupPage.loginWithCredentials(email, password);

        // Verify successful login by checking the logged in username
        await accountPage.verifyLoggedInUser(username);

        // Logout after successful login 
        await accountPage.logout();

        // Verify that the user is redirected back to the login page after logout
        await loginSignupPage.verifyLoginPageIsVisible();
    })

    test(' Verify User cannot login with Invalid Credentials', async({page})=>{
        const invalidEmail = 'invalid@example.com';
        const invalidPassword = 'InvalidPassword@123';

        // Attempt login with invalid credentials
        await loginSignupPage.loginWithCredentials(invalidEmail, invalidPassword);

        // Verify error message is displayed
        await loginSignupPage.verifyLoginErrorMessage();
    })
    
})
import { expect, test } from '@playwright/test';
import { CookiesPage } from '../src/pages/cookies.page.ts';
import { HomePage } from '../src/pages/homepage.page.ts';
import { LoginPage } from '../src/pages/login.page.ts';
import { loginData } from '../test-data/login.data.ts';

test(
  'successful login with correct credentials',
  {
    tag: '@login',
    annotation: { type: 'happy path', description: 'Basic happy path test' },
  },
  async ({ page }) => {
    const userEmail = loginData.userEmail!;
    const userPassword = loginData.userPassword!;

    const loginPage = new LoginPage(page);
    const cookiesPage = new CookiesPage(page);
    const homePage = new HomePage(page);

    await homePage.goto();
    await cookiesPage.acceptCookies();
    await loginPage.header.myAccountButton.click();

    await loginPage.login(userEmail, userPassword);

    await loginPage.header.myAccountButton.click();
    await expect(page).toHaveURL('/my-account');
  },
);

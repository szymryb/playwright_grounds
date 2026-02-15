import { expect, test } from '@playwright/test';
import { CookiesPage } from '../src/pages/cookies.page.ts';
import { HeaderPage } from '../src/pages/header.page.ts';
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
    const userEmail = loginData.userEmail;
    const userPassword = loginData.userPassword;

    const loginPage = new LoginPage(page);
    const cookiesPage = new CookiesPage(page);
    const headerPage = new HeaderPage(page);
    const homePage = new HomePage(page);

    await homePage.navigate();
    await cookiesPage.acceptCookies();
    await headerPage.myAccountButton.click();

    await loginPage.login(userEmail, userPassword);

    await headerPage.myAccountButton.click();
    await expect(page).toHaveURL('/my-account');
  },
);

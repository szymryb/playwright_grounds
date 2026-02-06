import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data.ts';
import { LoginPage } from '../pages/login.page.ts';
import { CookiesPage } from '../pages/cookies.page.ts';
import { HeaderPage } from '../pages/header.page.ts';

test('test', async ({ page }) => {
  const userEmail = loginData.userEmail;
  const userPassword = loginData.userPassword;

  const loginPage = new LoginPage(page);
  const cookiesPage = new CookiesPage(page);
  const headerPage = new HeaderPage(page);

  await page.goto('https://www.bauhaus.cz/');
  await cookiesPage.acceptCookies();
  await headerPage.myAccountButton.click();

  await loginPage.login(userEmail, userPassword);

  await headerPage.myAccountButton.click();
  await expect(page).toHaveURL('https://www.bauhaus.cz/my-account');
});

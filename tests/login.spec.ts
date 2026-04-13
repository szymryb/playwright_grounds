import { expect, test } from '@playwright/test';
import { LoginUserModel } from '../src/models/user.model.js';
import { CookiesPage } from '../src/pages/cookies.page.js';
import { HomePage } from '../src/pages/homepage.page.js';
import { LoginPage } from '../src/pages/login.page.js';
import { testUser1 } from '../src/test-data/login.data.js';

test.describe('Verify login', () => {
  test(
    'successful login with correct credentials',
    {
      tag: '@login',
      annotation: { type: 'happy path', description: 'Basic happy path test' },
    },
    async ({ page }) => {
      const loginPage = new LoginPage(page);
      const cookiesPage = new CookiesPage(page);
      const homePage = new HomePage(page);

      await homePage.goto();
      await homePage.waitForPageToLoadUrl();
      const title = await homePage.title();
      expect(title).toContain(
        'BAUHAUS Váš specialista pro dílnu, dům a zahradu',
      );
      await cookiesPage.acceptCookies();
      await loginPage.header.myAccountButton.click();

      await loginPage.login(testUser1);

      await loginPage.header.myAccountButton.click();
      await expect(page).toHaveURL('/my-account');
    },
  );

  test('reject login with incorrect password', async ({ page }) => {
    // Arrange
    const loginUserData: LoginUserModel = {
      userEmail: testUser1.userEmail,
      userPassword: 'incorrectPassword',
    };

    const loginPage = new LoginPage(page);
    const cookiesPage = new CookiesPage(page);
    const homePage = new HomePage(page);
    // Act
    await homePage.goto();
    await homePage.waitForPageToLoadUrl();
    await cookiesPage.acceptCookies();
    await loginPage.header.myAccountButton.click();

    await loginPage.login(loginUserData);

    // Assert
    await expect.soft(loginPage.loginError).toHaveText('Pole je povinné.');
    const title = await homePage.title();
    expect
      .soft(title)
      .toContain('BAUHAUS Váš specialista pro dílnu, dům a zahradu');
  });
});

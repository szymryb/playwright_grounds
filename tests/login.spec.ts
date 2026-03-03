import { expect, test } from '@playwright/test';
import { CookiesPage } from '../src/pages/cookies.page.ts';
import { HomePage } from '../src/pages/homepage.page.ts';
import { LoginPage } from '../src/pages/login.page.ts';
import { testUser1 } from '../test-data/login.data.ts';

test.describe('Verify login', () => {
  test(
    'successful login with correct credentials',
    {
      tag: '@login',
      annotation: { type: 'happy path', description: 'Basic happy path test' },
    },
    async ({ page }) => {
      const userEmail = testUser1.userEmail;
      const userPassword = testUser1.userPassword;

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

      await loginPage.login(userEmail, userPassword);

      await loginPage.header.myAccountButton.click();
      await expect(page).toHaveURL('/my-account');
    },
  );

  test('reject login with incorrect password', async ({ page }) => {
    // Arrange
    const userEmail = testUser1.userEmail;
    const userPassword = 'incorrectPassword';

    const loginPage = new LoginPage(page);
    const cookiesPage = new CookiesPage(page);
    const homePage = new HomePage(page);
    // Act
    await homePage.goto();
    await homePage.waitForPageToLoadUrl();
    await cookiesPage.acceptCookies();
    await loginPage.header.myAccountButton.click();

    await loginPage.login(userEmail, userPassword);

    // Assert
    await expect.soft(loginPage.loginError).toHaveText('Pole je povinné.');
    const title = await homePage.title();
    expect
      .soft(title)
      .toContain('BAUHAUS Váš specialista pro dílnu, dům a zahradu');
  });
});

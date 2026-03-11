import { expect, test } from '@playwright/test';
import { randomUserData } from '../src/factories/user.factory.ts';
import { CookiesPage } from '../src/pages/cookies.page.ts';
import { HomePage } from '../src/pages/homepage.page.ts';
import { LoginPage } from '../src/pages/login.page.ts';
import { RegisterPage } from '../src/pages/register.page.ts';

test.describe('Verify registration', () => {
  test('successful registration with correct credentials', async ({ page }) => {
    const registerUserData = randomUserData();
    const cookiesPage = new CookiesPage(page);
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);

    await homePage.goto();
    await homePage.waitForPageToLoadUrl();
    const title = await homePage.title();
    expect
      .soft(title)
      .toContain('BAUHAUS Váš specialista pro dílnu, dům a zahradu');
    await cookiesPage.acceptCookies();
    await loginPage.header.myAccountButton.click();

    await registerPage.registrationModalButton.press('Enter');
    //await registerPage.registrationModalButton.click();
    await registerPage.register(registerUserData);

    await expect
      .soft(
        page.getByRole('heading', {
          name: 'Ještě potřebujeme potvrdit va',
        }),
      )
      .toBeVisible();

    //confirm registration with API request
    // await registerPage.confirmRegistrationViaApi(registerUserData.userEmail);
    // await loginPage.login({
    //   userEmail: registerUserData.userEmail,
    //   userPassword: registerUserData.userPassword,
    // });
    // await loginPage.header.myAccountButton.click();
    // await expect(page).toHaveURL('/my-account');
  });
});

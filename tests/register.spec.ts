import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';
import { CookiesPage } from '../src/pages/cookies.page.ts';
import { HomePage } from '../src/pages/homepage.page.ts';
import { LoginPage } from '../src/pages/login.page.ts';
import { RegisterPage } from '../src/pages/register.page.ts';

test.describe('Verify registration', () => {
  test('successful registration with correct credentials', async ({ page }) => {
    const userFirstName = faker.person.firstName().replace(/[^A-Za-z]/g, '');
    const userLastName = faker.person.lastName().replace(/[^A-Za-z]/g, '');
    const userEmail = faker.internet.email();
    const userPassword = faker.internet.password();

    const cookiesPage = new CookiesPage(page);
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);

    await homePage.goto();
    await homePage.waitForPageToLoadUrl();
    const title = await homePage.title();
    expect(title).toContain('BAUHAUS Váš specialista pro dílnu, dům a zahradu');
    await cookiesPage.acceptCookies();
    await loginPage.header.myAccountButton.click();

    await registerPage.registrationModalButton.press('Enter');
    //await registerPage.registrationModalButton.click();
    await registerPage.register(
      userEmail,
      userFirstName,
      userLastName,
      userPassword,
    );

    await expect(
      page.getByRole('heading', {
        name: 'Ještě potřebujeme potvrdit va',
      }),
    ).toBeVisible();
  });
});

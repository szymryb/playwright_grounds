import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.bauhaus.cz/');
  await page.getByRole('button', { name: 'Nastavení preferencí' }).click();
  await page.getByRole('button', { name: 'Potvrdit vybrané' }).click();
  await page.getByRole('button', { name: 'Zobrazit můj účet' }).click();
  await page.getByRole('textbox', { name: 'E-mailová adresa *' }).click();
  //ctrl+shift+r - extract to constant
  const userEmail = 'szymon.rybak@vaimo.com';
  await page
    .getByRole('textbox', { name: 'E-mailová adresa *' })
    .fill(userEmail);
  await page.getByRole('textbox', { name: 'E-mailová adresa *' }).press('Tab');
  const userPassword = 'vaimoPass1234';
  await page.getByRole('textbox', { name: 'Heslo *' }).fill(userPassword);
  await page.getByRole('textbox', { name: 'Heslo *' }).press('Enter');
  await page.getByTestId('loginSubmit').click({ force: true });
  await page.getByRole('button', { name: 'Zobrazit můj účet' }).click();

  await expect(page).toHaveURL('https://www.bauhaus.cz/my-account');
});

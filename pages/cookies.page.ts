import { Locator, Page } from '@playwright/test';

export class CookiesPage {
  cookiesSettingsButton: Locator;
  cookiesAcceptButton: Locator;

  constructor(private page: Page) {
    this.cookiesSettingsButton = this.page.getByRole('button', {
      name: 'Nastavení preferencí',
    });
    this.cookiesAcceptButton = this.page.getByRole('button', {
      name: 'Potvrdit vybrané',
    });
  }

  async acceptCookies() {
    await this.cookiesSettingsButton.click();
    await this.cookiesAcceptButton.click();
  }
}

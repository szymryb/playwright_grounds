import { expect, Locator, Page } from '@playwright/test';

export class CookiesPage {
  cookieModal: Locator;
  cookiesSettingsButton: Locator;
  cookiesAcceptButton: Locator;

  constructor(private page: Page) {
    this.cookieModal = this.page.locator('.modal-wrap cookie-modal');
    this.cookiesSettingsButton = this.page.getByRole('button', {
      name: 'Nastavení preferencí',
    });
    this.cookiesAcceptButton = this.page.getByRole('button', {
      name: 'Povolit vše',
    });
  }

  async acceptCookies(): Promise<void> {
    await this.cookiesAcceptButton.click();
    await expect(this.cookieModal).toBeHidden();
  }

  async cookiesSettings(): Promise<void> {
    await this.page.waitForLoadState();
    await this.cookiesSettingsButton.click();
  }
}

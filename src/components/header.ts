import { Locator, Page } from '@playwright/test';

export class Header {
  myAccountButton: Locator;

  constructor(private page: Page) {
    this.myAccountButton = this.page.getByRole('button', {
      name: 'Zobrazit můj účet',
    });
  }
}

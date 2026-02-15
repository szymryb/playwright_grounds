import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  url = '';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto(this.url);
  }

  async title(): Promise<string> {
    await this.page.waitForLoadState();
    return this.page.title();
  }
}

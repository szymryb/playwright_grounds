import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  url = '/';

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await super.navigate();
    await expect(this.title()).resolves.toContain(
      'BAUHAUS Váš specialista pro dílnu, dům a zahradu | bauhaus.cz',
    );
  }
}

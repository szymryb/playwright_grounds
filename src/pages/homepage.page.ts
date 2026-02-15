import { expect, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly url = '/';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto(this.url);
    expect(this.title()).resolves.toContain(
      'BAUHAUS Váš specialista pro dílnu, dům a zahradu | bauhaus.cz',
    );
  }

  async title(): Promise<string> {
    await this.page.waitForLoadState();
    return this.page.title();
  }
}

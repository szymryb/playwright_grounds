import { expect, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly url = '/';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto(this.url);
    const title = await this.page.title();
    expect(title).toContain(
      'BAUHAUS Váš specialista pro dílnu, dům a zahradu | bauhaus.cz',
    );
  }
}

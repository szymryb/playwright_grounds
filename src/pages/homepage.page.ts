import { Page } from '@playwright/test';
import { BasePage } from './base.page.js';

export class HomePage extends BasePage {
  url = '/';

  constructor(page: Page) {
    super(page);
  }
}

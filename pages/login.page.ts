import { Locator, Page } from '@playwright/test';

export class LoginPage {
  myAccountButton: Locator;
  loginInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;

  constructor(private page: Page) {
    this.myAccountButton = this.page.getByRole('button', {
      name: 'Zobrazit můj účet',
    });
    this.loginInput = this.page.getByRole('textbox', {
      name: 'E-mailová adresa *',
    });
    this.passwordInput = this.page.getByRole('textbox', {
      name: 'Heslo *',
    });
    this.loginButton = this.page.getByTestId('loginSubmit');
  }

  async login(userEmail: string, userPassword: string) {
    await this.loginInput.fill(userEmail);
    await this.passwordInput.fill(userPassword);
    await this.loginButton.click();
  }
}

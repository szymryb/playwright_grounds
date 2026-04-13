import { Locator, Page } from '@playwright/test';
import { Header } from '../components/header.js';
import { LoginUserModel } from '../models/user.model.js';

export class LoginPage {
  loginInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  header: Header;
  loginError: Locator;

  constructor(private page: Page) {
    this.loginInput = this.page.getByRole('textbox', {
      name: 'E-mailová adresa *',
    });
    this.passwordInput = this.page.getByRole('textbox', {
      name: 'Heslo *',
    });
    this.loginButton = this.page.getByTestId('loginSubmit');
    this.header = new Header(this.page);
    this.loginError = this.page.getByTestId('errorMessage');
  }

  async login(loginUserData: LoginUserModel): Promise<void> {
    await this.loginInput.fill(loginUserData.userEmail);
    await this.passwordInput.fill(loginUserData.userPassword);
    await this.loginButton.click();
  }
}

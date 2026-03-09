import { Locator, Page } from '@playwright/test';
import { Header } from '../components/header.ts';

export class RegisterPage {
  registrationModalButton: Locator;
  registrationModalHeader: Locator;
  emailInput: Locator;
  userFirstNameInput: Locator;
  userLastNameInput: Locator;
  passwordInput: Locator;
  repeatPasswordInput: Locator;
  confirmCheckbox: Locator;
  registerButton: Locator;
  header: Header;

  constructor(private page: Page) {
    this.registrationModalButton = this.page.getByRole('button', {
      name: 'Vytvořit účet',
    });
    this.registrationModalHeader = this.page.getByRole('heading', {
      name: 'Vytvořit účet',
    });
    this.emailInput = this.page.getByRole('textbox', {
      name: 'E-mailová adresa *',
    });
    this.userFirstNameInput = this.page.getByRole('textbox', {
      name: 'Jméno *',
    });
    this.userLastNameInput = this.page.getByRole('textbox', {
      name: 'Příjmení *',
    });
    this.passwordInput = this.page.getByRole('textbox', {
      name: 'Heslo *',
      exact: true,
    });
    this.repeatPasswordInput = this.page.getByRole('textbox', {
      name: 'Opakovat heslo *',
    });
    this.confirmCheckbox = this.page.getByText('Souhlasím s podmínkami');
    this.registerButton = this.page.getByRole('button', {
      name: 'Zaregistrovat se',
    });
    this.header = new Header(this.page);
  }

  async register(
    userEmail: string,
    userFirstName: string,
    userLastName: string,
    userPassword: string,
  ): Promise<void> {
    await this.emailInput.fill(userEmail);
    await this.userFirstNameInput.fill(userFirstName);
    await this.userLastNameInput.fill(userLastName);
    await this.passwordInput.fill(userPassword);
    await this.repeatPasswordInput.fill(userPassword);
    await this.confirmCheckbox.check();
    await this.registerButton.click();
  }
}

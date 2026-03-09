import { Locator, Page } from '@playwright/test';
import { Header } from '../components/header.ts';
import { RegisterUser } from '../models/user.model.ts';

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

  async register(registerUserData: RegisterUser): Promise<void> {
    await this.emailInput.fill(registerUserData.userEmail);
    await this.userFirstNameInput.fill(registerUserData.userFirstName);
    await this.userLastNameInput.fill(registerUserData.userLastName);
    await this.passwordInput.fill(registerUserData.userPassword);
    await this.repeatPasswordInput.fill(registerUserData.userPassword);
    await this.confirmCheckbox.check();
    await this.registerButton.click();
  }
}

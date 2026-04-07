import { Locator, Page } from '@playwright/test';
import { Header } from '../components/header.ts';
import { RegisterUserModel } from '../models/user.model.ts';

export class RegisterPage {
  registrationModalButton: Locator;
  registrationModalHeader: Locator;
  userEmailInput: Locator;
  userFirstNameInput: Locator;
  userLastNameInput: Locator;
  userPasswordInput: Locator;
  userRepeatPasswordInput: Locator;
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
    this.userEmailInput = this.page.getByRole('textbox', {
      name: 'E-mailová adresa *',
    });
    this.userFirstNameInput = this.page.getByRole('textbox', {
      name: 'Jméno *',
    });
    this.userLastNameInput = this.page.getByRole('textbox', {
      name: 'Příjmení *',
    });
    this.userPasswordInput = this.page.getByRole('textbox', {
      name: 'Heslo *',
      exact: true,
    });
    this.userRepeatPasswordInput = this.page.getByRole('textbox', {
      name: 'Opakovat heslo *',
    });
    this.confirmCheckbox = this.page.getByText('Souhlasím s podmínkami');
    this.registerButton = this.page.getByRole('button', {
      name: 'Zaregistrovat se',
    });
    this.header = new Header(this.page);
  }

  async register(registerUserData: RegisterUserModel): Promise<void> {
    await this.userEmailInput.fill(registerUserData.userEmail);
    await this.userFirstNameInput.fill(registerUserData.userFirstName);
    await this.userLastNameInput.fill(registerUserData.userLastName);
    await this.userPasswordInput.fill(registerUserData.userPassword);
    await this.userRepeatPasswordInput.fill(registerUserData.userPassword);
    await this.confirmCheckbox.check();
    await this.registerButton.click();
  }
  //TBD : no straight endpoint for confirm registration
  async confirmRegistrationViaApi(userEmail: string): Promise<void> {
    const response = await this.page.request.get(
      `https://bauhaus-cz-pre-prod-m2.vaimo.net/customer/account/confirm/?email=${userEmail}`,
    );
    if (response.status() !== 200) {
      throw new Error(
        `Failed to confirm registration for ${userEmail}. Status: ${response.status()}`,
      );
    }
  }
}

import { RegisterUser } from '../models/user.model.ts';

export async function randomUserData(): Promise<RegisterUser> {
  const { faker } = await import('@faker-js/faker');
  const registerUserData: RegisterUser = {
    userFirstName: faker.person.firstName(),
    userLastName: faker.person.lastName(),
    userEmail: faker.internet.email(),
    userPassword: faker.internet.password(),
  };
  return registerUserData;
}

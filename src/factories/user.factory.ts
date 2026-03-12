import { faker } from '@faker-js/faker';
import { RegisterUser } from '../models/user.model.ts';

export function randomUserData(): RegisterUser {
  const registerUserData: RegisterUser = {
    userFirstName: faker.person.firstName(),
    userLastName: faker.person.lastName(),
    userEmail: faker.internet.email(),
    userPassword: faker.internet.password(),
  };
  return registerUserData;
}

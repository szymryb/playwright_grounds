import { faker } from '@faker-js/faker';
import { RegisterUserModel } from '../models/user.model.js';

export function randomUserData(): RegisterUserModel {
  return {
    userFirstName: faker.person.firstName(),
    userLastName: faker.person.lastName(),
    userEmail: faker.internet.email(),
    userPassword: faker.internet.password(),
  };
}

import * as Faker from 'faker';
import { Factory } from '../../lib/seeds';
import { User } from '../../../src/api/models/User';

const factory = Factory.getInstance();


/**
 * User factory
 */
factory.define(User, (faker: typeof Faker) => {
    const gender = faker.random.number(1);
    const firstName = faker.name.firstName(gender);
    const lastName = faker.name.lastName(gender);
    const email = faker.internet.email(firstName, lastName);
    const password = '12345678';

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
    return user;
});

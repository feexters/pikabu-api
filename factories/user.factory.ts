import Faker from 'faker';
import { User } from 'src/users/entities';
import { define } from 'typeorm-seeding';

define(User, (faker: typeof Faker) => {
  const user = new User();

  user.email = faker.internet.email();

  return user;
});

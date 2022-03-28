import { Comment } from 'src/comments/entities';
import { define } from 'typeorm-seeding';
import Faker from 'faker';

define(Comment, (faker: typeof Faker) => {
  const comment = new Comment();

  comment.comment = faker.hacker.phrase();

  return comment;
});

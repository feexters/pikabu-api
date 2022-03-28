import { Post } from 'src/posts/entities';
import { define } from 'typeorm-seeding';
import Faker from 'faker';

define(Post, (faker: typeof Faker) => {
  const post = new Post();

  post.title = faker.hacker.phrase();
  post.description = faker.lorem.paragraph();

  return post;
});

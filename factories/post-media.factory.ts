import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { PostMedia } from 'src/post-media/entities';

define(PostMedia, (faker: typeof Faker) => {
  const postMedia = new PostMedia();

  postMedia.source = faker.image.cats();

  return postMedia;
});

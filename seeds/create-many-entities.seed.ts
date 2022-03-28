import { Comment } from 'src/comments/entities';
import { MediaType } from 'src/common/types';
import { PostMedia } from 'src/post-media/entities';
import { Post } from 'src/posts/entities';
import { User } from 'src/users/entities';
import { Factory, Seeder } from 'typeorm-seeding';
import { getHashedPassword } from '../src/common/utils/get-hashed-password';
import { takeRandom } from '../src/common/utils/take-random';

export default class CreateManyEntities implements Seeder {
  public async run(factory: Factory): Promise<any> {
    const users = await Promise.all(
      new Array(10).fill(undefined).map((_, index) =>
        factory(User)().create({
          username: 'username_' + index,
          password: getHashedPassword('12345' + index),
        }),
      ),
    );

    const userIds = users.map(({ id }) => id);

    const posts = await Promise.all(
      new Array(15).fill(undefined).map(() =>
        factory(Post)().create({
          userId: takeRandom(userIds),
        }),
      ),
    );

    await Promise.all(
      new Array(15).fill(undefined).map((_, index) => {
        const post = takeRandom(posts);
        const user = takeRandom(users);

        return factory(Comment)().create({
          comment: 'cooment' + index,
          postId: post.id,
          userId: user.id,
        });
      }),
    );

    await Promise.all(
      posts.map((item) => {
        return factory(PostMedia)().create({
          postId: item.id,
          type: MediaType.PHOTO,
        });
      }),
    );
  }
}

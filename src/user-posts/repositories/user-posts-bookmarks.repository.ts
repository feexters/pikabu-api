import { PageOffsetInfo } from 'src/common/models';
import { Post } from 'src/posts/entities';
import { EntityRepository, Repository } from 'typeorm';
import { UserPostsBookmarks } from '../entities';
import { PostsBookmarksInput } from '../v1/inputs';

@EntityRepository(UserPostsBookmarks)
export class UserPostsBookmarksRepository extends Repository<UserPostsBookmarks> {
  async getPostsPagination(
    userId: string,
    { page = 1, limit = 10 }: PostsBookmarksInput,
  ): Promise<
    {
      posts: Post[];
    } & PageOffsetInfo
  > {
    const qb = this.createQueryBuilder(UserPostsBookmarks.tableName)
      .where(`${UserPostsBookmarks.tableName}."userId" = :userId`, { userId })
      .leftJoinAndSelect(`${UserPostsBookmarks.tableName}.post`, 'post');

    const count = await qb.getCount();
    const posts = await qb
      .skip(limit * (page - 1))
      .take(limit)
      .getMany();

    return {
      posts: posts.map((item) => item.post),
      count: posts.length,
      page,
      total: count,
    };
  }
}

import { Comment } from 'src/comments/entities';
import { PageOffsetInfo } from 'src/common/models';
import { EntityRepository, Repository } from 'typeorm';
import { UserCommentsBookmarks } from '../entities';
import { CommentsBookmarksInput } from '../v1/inputs';

@EntityRepository(UserCommentsBookmarks)
export class UserCommentsBookmarksRepository extends Repository<UserCommentsBookmarks> {
  async getCommentsPagination(
    userId: string,
    { page = 1, limit = 10 }: CommentsBookmarksInput,
  ): Promise<
    {
      comments: Comment[];
    } & PageOffsetInfo
  > {
    const qb = this.createQueryBuilder(UserCommentsBookmarks.tableName)
      .where(`${UserCommentsBookmarks.tableName}."userId" = :userId`, { userId })
      .leftJoinAndSelect(`${UserCommentsBookmarks.tableName}.comment`, 'comment');

    const count = await qb.getCount();
    const comments = await qb
      .skip(limit * (page - 1))
      .take(limit)
      .getMany();

    return {
      comments: comments.map((item) => item.comment),
      count: comments.length,
      page,
      total: count,
    };
  }
}

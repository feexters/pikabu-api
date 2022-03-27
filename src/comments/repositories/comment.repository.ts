import { PageOffsetInfo } from 'src/common/models';
import { UserCommentLikeType } from 'src/user-comments/user-comments.types';
import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { Comment } from '../entities';
import { CommentsPostGetInput } from '../v1/inputs';

@EntityRepository(Comment)
export class CommentsRepository extends Repository<Comment> {
  async isCommentOwner({ commentId, userId }: { commentId: string; userId: string }): Promise<boolean> {
    const comment = await this.findOne({ id: commentId, userId });

    if (!comment) {
      return false;
    }

    return true;
  }

  async getCommentsPagination({ page = 1, limit = 10, order, postId }: CommentsPostGetInput): Promise<
    {
      comments: Comment[];
    } & PageOffsetInfo
  > {
    const qb = this.createQueryBuilder(Comment.tableName)
      .where(`${Comment.tableName}."postId" = (:postId)`, {
        postId,
      })
      .orderBy('"createdAt"', order?.createdAt)
      .addOrderBy('"likesCount"', order?.likesCount);

    const count = await qb.getCount();
    const comments = await qb
      .skip(limit * (page - 1))
      .take(limit)
      .getMany();

    return {
      comments,
      count: comments.length,
      page,
      total: count,
    };
  }

  async updateLikeCounters({
    commentId,
    increment,
    decrement,
  }: {
    commentId: string;
    increment?: UserCommentLikeType;
    decrement?: UserCommentLikeType;
  }): Promise<boolean> {
    const incrementByType = {
      [UserCommentLikeType.LIKE]: (): Promise<UpdateResult> => this.increment({ id: commentId }, 'likesCount', 1),
      [UserCommentLikeType.DISLIKE]: (): Promise<UpdateResult> => this.increment({ id: commentId }, 'dislikesCount', 1),
    };

    if (increment) {
      await incrementByType[increment]();
    }

    const decrementByType = {
      [UserCommentLikeType.LIKE]: (): Promise<UpdateResult> => this.decrement({ id: commentId }, 'likesCount', 1),
      [UserCommentLikeType.DISLIKE]: (): Promise<UpdateResult> => this.decrement({ id: commentId }, 'dislikesCount', 1),
    };

    if (decrement) {
      await decrementByType[decrement]();
    }

    return true;
  }
}

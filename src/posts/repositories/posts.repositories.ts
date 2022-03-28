import { UserPostsLike } from 'src/user-posts/entities';
import { PageOffsetInfo } from 'src/common/models';
import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { Post } from '../entities';
import { PostsGetInput } from '../v1/inputs';
import { UserPostLikeType } from '../../user-posts/user-posts.types';
import { FilterGroupType } from 'src/common/types';
import { Comment } from 'src/comments/entities';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {
  async isPostOwner({ postId, userId }: { postId: string; userId: string }): Promise<boolean> {
    const post = await this.findOne({ id: postId, userId });

    if (!post) {
      return false;
    }

    return true;
  }

  async getPostsPagination({ page = 1, limit = 10, order, filters = {} }: PostsGetInput): Promise<
    {
      posts: Post[];
    } & PageOffsetInfo
  > {
    const { search = '', tags = [], groupType } = filters;

    const qb = this.createQueryBuilder(Post.tableName)
      .addSelect('*')
      .where(`${Post.tableName}.title ILIKE(:search)`, {
        search: `%${search}%`,
      })
      .andWhere(`${Post.tableName}.tags @> :tags`, { tags });

    if (!groupType) {
      qb.orderBy('"createdAt"', order?.createdAt).addOrderBy('"likesCount"', order?.likesCount);
    }

    if (groupType === FilterGroupType.NEW) {
      qb.andWhere(`${Post.tableName}."createdAt" BETWEEN (NOW() - INTERVAL '24 HOUR') AND NOW()`);
    }

    if (groupType === FilterGroupType.THE_BEST) {
      qb.innerJoinAndSelect(
        (query) => {
          return query
            .from(`${UserPostsLike.tableName}`, 'upl')
            .select('upl."postId", count(upl."postId") as "count"')
            .where('upl."createdAt" BETWEEN (NOW() - INTERVAL \'24 HOUR\') AND NOW()')
            .groupBy('upl."postId"');
        },
        'likesByDay',
        `${Post.tableName}.id = "likesByDay"."postId"`,
      ).orderBy('"likesByDay".count', 'DESC');
    }

    if (groupType === FilterGroupType.HOT) {
      qb.innerJoinAndSelect(
        (query) => {
          return query
            .from(`${Comment.tableName}`, 'comment')
            .select('comment."postId", count(comment."postId") as "count"')
            .where('comment."createdAt" BETWEEN (NOW() - INTERVAL \'24 HOUR\') AND NOW()')
            .groupBy('comment."postId"');
        },
        'commentsByDay',
        `${Post.tableName}.id = "commentsByDay"."postId"`,
      ).orderBy('"commentsByDay".count', 'DESC');
    }

    const count = await qb.getCount();
    const posts = await qb
      .skip(limit * (page - 1))
      .take(limit)
      .getRawMany();

    return {
      posts,
      count: posts.length,
      page,
      total: count,
    };
  }

  async updateLikeCounters({
    postId,
    increment,
    decrement,
  }: {
    postId: string;
    increment?: UserPostLikeType;
    decrement?: UserPostLikeType;
  }): Promise<boolean> {
    const incrementByType = {
      [UserPostLikeType.LIKE]: (): Promise<UpdateResult> => this.increment({ id: postId }, 'likesCount', 1),
      [UserPostLikeType.DISLIKE]: (): Promise<UpdateResult> => this.increment({ id: postId }, 'dislikesCount', 1),
    };

    if (increment) {
      await incrementByType[increment]();
    }

    const decrementByType = {
      [UserPostLikeType.LIKE]: (): Promise<UpdateResult> => this.decrement({ id: postId }, 'likesCount', 1),
      [UserPostLikeType.DISLIKE]: (): Promise<UpdateResult> => this.decrement({ id: postId }, 'dislikesCount', 1),
    };

    if (decrement) {
      await decrementByType[decrement]();
    }

    return true;
  }
}

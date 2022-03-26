import { PageOffsetInfo } from 'src/common/models';
import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { Post } from '../entities';
import { PostsGetInput } from '../v1/inputs';
import { UserPostLikeType } from '../../user-posts/user-posts.types';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {
  async isPostOwner({ postId, userId }: { postId: string; userId: string }): Promise<boolean> {
    const post = await this.findOne({ id: postId, userId });

    if (!post) {
      return false;
    }

    return true;
  }

  async getPostsPagination({ page = 1, limit = 10 }: PostsGetInput): Promise<
    {
      posts: Post[];
    } & PageOffsetInfo
  > {
    const [posts, count] = await this.findAndCount({ take: limit, skip: page - 1 });

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

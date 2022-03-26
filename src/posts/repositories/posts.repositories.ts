import { PageOffsetInfo } from 'src/common/models';
import { EntityRepository, Repository } from 'typeorm';
import { Post } from '../entities';
import { PostsGetInput } from '../v1/inputs';

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
}

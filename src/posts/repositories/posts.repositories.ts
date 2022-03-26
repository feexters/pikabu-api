import { EntityRepository, Repository } from 'typeorm';
import { Post } from '../entities';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {
  async isPostOwner({ postId, userId }: { postId: string; userId: string }): Promise<boolean> {
    const post = await this.findOne({ id: postId, userId });

    if (!post) {
      return false;
    }

    return true;
  }
}

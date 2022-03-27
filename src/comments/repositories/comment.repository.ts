import { EntityRepository, Repository } from 'typeorm';
import { Comment } from '../entities';

@EntityRepository(Comment)
export class CommentsRepository extends Repository<Comment> {
  async isCommentOwner({ commentId, userId }: { commentId: string; userId: string }): Promise<boolean> {
    const comment = await this.findOne({ id: commentId, userId });

    if (!comment) {
      return false;
    }

    return true;
  }
}

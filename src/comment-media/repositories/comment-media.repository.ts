import { EntityRepository, Repository } from 'typeorm';
import { CommentMedia } from '../entities';

@EntityRepository(CommentMedia)
export class CommentMediaRepository extends Repository<CommentMedia> {
  async getCommentMediaLoader(commentIds: readonly string[]): Promise<CommentMedia[][]> {
    const commentMedia = await this.createQueryBuilder(CommentMedia.tableName)
      .where(`${CommentMedia.tableName}."commentId" IN (:...commentIds)`, {
        commentIds,
      })
      .getMany();

    return commentIds.map((id) => commentMedia.filter((media) => media.commentId === id));
  }
}

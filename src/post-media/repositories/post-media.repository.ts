import { EntityRepository, Repository } from 'typeorm';
import { PostMedia } from '../entities';

@EntityRepository(PostMedia)
export class PostMediaRepository extends Repository<PostMedia> {
  async getPostMediaLoader(postIds: readonly string[]): Promise<PostMedia[][]> {
    const postMedia = await this.createQueryBuilder(PostMedia.tableName)
      .where(`${PostMedia.tableName}."postId" IN (:...postIds)`, {
        postIds,
      })
      .getMany();

    return postIds.map((id) => postMedia.filter((media) => media.postId === id));
  }
}

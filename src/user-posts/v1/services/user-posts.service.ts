import { Injectable } from '@nestjs/common';
import { PostsRepository } from 'src/posts/repositories';
import { UserPostsLikeRepository } from '../../repositories/user-posts-like.repository';
import { PostAddLikeInput } from '../inputs';

@Injectable()
export class UserPostsService {
  constructor(
    private readonly usersPostsLikeRepository: UserPostsLikeRepository,
    private readonly postsRepository: PostsRepository,
  ) {}

  async postAddLike(userId: string, { postId, type }: PostAddLikeInput): Promise<boolean> {
    const existRelation = await this.usersPostsLikeRepository.findOne({ userId, postId });

    if (!existRelation) {
      const created = this.usersPostsLikeRepository.create({ userId, postId, type });

      await this.usersPostsLikeRepository.save(created);

      return this.postsRepository.updateLikeCounters({ postId, increment: type });
    }

    if (existRelation.type === type) {
      await this.usersPostsLikeRepository.remove(existRelation);

      return this.postsRepository.updateLikeCounters({ postId, decrement: type });
    }

    const newRelation = await this.usersPostsLikeRepository.save({ ...existRelation, type });

    return this.postsRepository.updateLikeCounters({
      postId,
      decrement: existRelation.type,
      increment: newRelation.type,
    });
  }
}
